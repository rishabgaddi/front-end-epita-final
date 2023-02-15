import { TopPopularMovies } from 'app/components/TopPopularMovies/Loadable';
import { TopViewedMovies } from 'app/components/TopViewedMovies/Loadable';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

export function StatsPage() {
  return (
    <>
      <Helmet>
        <title>Top Statistics</title>
        <meta name="description" content="Stats Page" />
      </Helmet>

      <Wrapper>
        <H1>Top Statistics</H1>

        <H3>Top 10 Popular</H3>
        <TopPopularMovies />

        <H3>Top 10 Watched</H3>
        <TopViewedMovies />
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
