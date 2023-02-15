import React from 'react';
import { useTranslation } from 'react-i18next';
import { fetchTopWatchedMovies } from 'services/movie';
import styled from 'styled-components';
import { Movie } from 'types/Movie';
import { MovieCard } from '../MovieCard/Loadable';

export function TopViewedMovies() {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { t } = useTranslation();

  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchTopWatchedMovies();
        setMovies(data.movies);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return isLoading ? (
    <>
      <Wrapper>Loading...</Wrapper>
    </>
  ) : (
    <>
      <Wrapper>
        {movies && movies.length > 0 ? (
          movies.map((movie: Movie) => (
            <MovieCard key={`topmovie-${movie._id}`} movie={movie} />
          ))
        ) : (
          <Text>{t('no_movies')}</Text>
        )}
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
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 1rem;
`;
