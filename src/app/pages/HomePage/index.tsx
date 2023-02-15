import { LastSeenMovies } from 'app/components/LastSeenMovies/Loadable';
import { LatestMovies } from 'app/components/LatestMovies/Loadable';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { AuthState } from 'slices/authSlice';
import styled from 'styled-components';

export function HomePage() {
  const state: AuthState = useSelector((state: any) => state.auth);
  const [name, setName] = React.useState('Stranger');

  React.useEffect(() => {
    if (state.user) {
      setName(state.user.firstName + ' ' + state.user.lastName);
    }
  }, [state]);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="A Movie App" />
      </Helmet>
      <Wrapper>
        <H1>Welcome {name}</H1>

        <H3>Latest</H3>
        <LatestMovies />

        <H3>Last seen</H3>
        <LastSeenMovies />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
  text-align: center;
`;

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
`;

const H3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
`;
