import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getTokens, logout } from 'services/auth';
import { getUser } from 'services/user';
import { deleteCredentials, setToken, setUser } from 'slices/authSlice';
import styled from 'styled-components';
import { Token } from 'types/Token';
import { User } from 'types/User';
import { generateFormEncodedBody, isValidToken } from 'utils/utils';

const Navbar = ({ children, isPrivate = false }) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const validateAuth = async () => {
      let access_token = localStorage.getItem('token');
      if (access_token) {
        if (!isValidToken(access_token)) {
          const details = {
            grant_type: 'refresh_token',
            client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
            refresh_token: localStorage.getItem('refresh_token'),
          };
          const token: Token = await getTokens(
            generateFormEncodedBody(details),
          );
          if (token) {
            localStorage.setItem('token', token.access_token);
            localStorage.setItem('refresh_token', token.refresh_token);
            dispatch(setToken({ token }));
            setIsAuth(true);
            if (!isPrivate) {
              navigate('/');
            }
          }
        }
        const user: User = await getUser('admin2@epita.fr', access_token);
        dispatch(setUser({ user }));
        setIsAuth(true);
        navigate('/');
      } else {
        navigate('/login');
      }
    };
    try {
      validateAuth();
    } catch (error) {
      console.log(error);
    }
  }, [isAuth, isPrivate, navigate, dispatch]);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      await logout(refreshToken);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    dispatch(deleteCredentials());
    setIsAuth(false);
    navigate('/login');
  };

  return (
    <>
      <Wrapper>
        <Nav>
          {isAuth ? (
            <>
              <Link to="/">Home</Link>
              {/* <Link to="/logout">Logout</Link> */}
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
            </>
          )}
        </Nav>
        <Container>{children}</Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: #ef476f;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  height: 3rem;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: black;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  color: white;
`;

export default Navbar;
