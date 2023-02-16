import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'services/auth';
import { getUser } from 'services/user';
import { deleteCredentials, setUser } from 'slices/authSlice';
import styled from 'styled-components';
import { User } from 'types/User';
import { clearTokens, decodeUsername, getLocalStorage } from 'utils/utils';

const Navbar = ({ children, isPrivate = false }) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserMemoized = React.useMemo(() => getUser, []);

  const validateAuth = React.useCallback(async () => {
    let token = getLocalStorage('token');
    if (token) {
      try {
        const username = decodeUsername(token);
        const user: User = await getUserMemoized(username);
        dispatch(setUser({ user }));
        setIsAuth(true);
        setIsAdmin(user.type === 'admin');
        if (!isPrivate) {
          navigate('/');
        }
        return;
      } catch (error) {
        console.log(error);
      }
    }
    navigate('/login');
  }, [navigate, dispatch, isPrivate, getUserMemoized]);

  React.useEffect(() => {
    validateAuth();
  }, [validateAuth]);

  const handleLogout = async () => {
    try {
      const refreshToken = getLocalStorage('refresh_token');
      if (refreshToken) {
        await logout(refreshToken);
      }
    } catch (error) {
      console.log(error);
    } finally {
      clearTokens(['token', 'refresh_token']);
      dispatch(deleteCredentials());
      setIsAuth(false);
      navigate('/login');
    }
  };

  return (
    <>
      <Wrapper>
        <Nav>
          {isAuth ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/stats">Top Stats</Link>
              {isAdmin && <Link to="/add-movie">Add Movie</Link>}
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
