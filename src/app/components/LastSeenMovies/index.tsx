import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AuthState } from 'slices/authSlice';
import styled from 'styled-components';
import { Movie } from 'types/Movie';
import { MovieCard } from '../MovieCard/Loadable';
import { fetchSeenMovies } from 'services/movie';

export const LastSeenMovies = () => {
  const state: AuthState = useSelector((state: any) => state.auth);
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const { t } = useTranslation();

  React.useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchSeenMovies(state.user?.username!);
      setMovies(data.movies);
    };
    if (state.user) {
      fetchMovies();
    }
  }, [state.user]);

  return (
    <>
      <Wrapper>
        {movies && movies.length > 0 ? (
          movies.map((movie: Movie) => (
            <MovieCard key={`movie-${movie._id}`} movie={movie} />
          ))
        ) : (
          <Text>{t('no_movies')}</Text>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 20px;
  margin: 0 -20px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 1rem;
`;
