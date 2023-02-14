import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { fetchMovie } from 'services/movie';
import styled from 'styled-components';
import { Movie } from 'types/Movie';

export function MoviePage() {
  let id = useParams().id;
  const [movieDetails, setMovieDetails] = React.useState<Movie>();

  const fetchMovieDetails = async (id: string) => {
    const data = await fetchMovie(id);
    setMovieDetails(data.movie);
  };

  const markAsWatched = async () => {};

  React.useEffect(() => {
    fetchMovieDetails(id!);
  }, [id, movieDetails]);

  return (
    <>
      <Helmet>
        <title>Movie Page</title>
        <meta name="description" content="Movie Page" />
      </Helmet>
      <Wrapper>
        <Video
          controls
          src={movieDetails?.trailerURL}
          onEnded={markAsWatched}
        />
        <Text>{movieDetails?.title}</Text>
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

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Text = styled.p`
  font-size: 1rem;
`;
