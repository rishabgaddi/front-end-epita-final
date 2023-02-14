import React from 'react';
import { fetchLatestMovies } from 'services/movie';
import styled from 'styled-components';
import { Movie } from 'types/Movie';
import { MovieCard } from '../MovieCard/Loadable';

export function LatestMovies() {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchLatestMovies();
      setMovies(data.movies);
    };
    fetchMovies();
  }, []);

  return (
    <>
      <Wrapper>
        {movies.map((movie: Movie) => (
          <MovieCard key={`movie-${movie._id}`} movie={movie} />
        ))}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 20px;
  margin: 0 -20px;
`;
