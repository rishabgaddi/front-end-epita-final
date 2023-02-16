import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import InputBox from 'app/components/InputBox';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setCredentials } from 'slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Token } from 'types/Token';
import { getTokens } from 'services/auth';
import { User } from 'types/User';
import { getUser } from 'services/user';
import { generateFormEncodedBody, setLocalStorage } from 'utils/utils';

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loginData, setLoginData] = React.useState({
    username: '',
    password: '',
  });

  const onChangeHandler = (
    e: React.FormEvent<HTMLInputElement> | any,
  ): void => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password } = loginData;
    if (!username || !password) {
      return;
    }
    try {
      const details = {
        grant_type: 'password',
        client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
        username,
        password,
      };
      const formBodyEncoded = generateFormEncodedBody(details);
      const token: Token = await getTokens(formBodyEncoded);
      setLocalStorage('token', token.access_token);
      setLocalStorage('refresh_token', token.refresh_token);
      const user: User = await getUser(username);
      dispatch(setCredentials({ user, token }));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login Page" />
      </Helmet>
      <Wrapper>
        <Text>Login</Text>
        <Form onSubmit={handleLogin}>
          <InputBox
            name={'username'}
            type={'text'}
            value={loginData.username}
            placeholder={t('enter_username')}
            onChange={onChangeHandler}
          />
          <InputBox
            name={'password'}
            type={'password'}
            value={loginData.password}
            placeholder={t('enter_password')}
            onChange={onChangeHandler}
          />
          <Button type="submit">Let's Go</Button>
        </Form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.span`
  font-size: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 300px;
  height: 40px;
  border: 3px solid silver;
  background-color: black;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;
