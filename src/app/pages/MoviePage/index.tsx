import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMovie } from 'services/movie';
import { fetchRatingByMovieIdAndUsername } from 'services/rating';
import { addSeenMovie } from 'services/seenMovie';
import { AuthState } from 'slices/authSlice';
import styled from 'styled-components';
import { Movie } from 'types/Movie';
import { Rating } from 'types/Rating';

export function MoviePage() {
  let id = useParams().id;
  const state: AuthState = useSelector((state: any) => state.auth);
  const [movieDetails, setMovieDetails] = React.useState<Movie>();
  const [rating, setRating] = React.useState<Rating>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const navigate = useNavigate();

  const fetchDetails = async (id: string) => {
    try {
      const data = await fetchMovie(id);
      setMovieDetails(data.movie);

      const userRating = await fetchRatingByMovieIdAndUsername(
        data.movie._id,
        state.user?.username!,
      );
      setRating(userRating.rating);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoaded(true);
    }
  };

  const markAsWatched = async () => {
    await addSeenMovie(
      new Date().toISOString(),
      movieDetails?._id!,
      state.user?.username!,
    );
  };

  const rateMovie = async () => {
    navigate(`/rate/movie/${movieDetails?._id}`);
  };

  React.useEffect(() => {
    if (state.user && id) {
      fetchDetails(id!);
    }
  }, [id, state.user]);

  return (
    <>
      <Helmet>
        <title>Movie</title>
        <meta name="description" content="Movie Page" />
      </Helmet>
      {!isLoaded ? (
        <Wrapper>Loading ...</Wrapper>
      ) : !movieDetails ? (
        <NotFoundPage />
      ) : (
        <Wrapper>
          <Video
            controls
            src={movieDetails?.trailerURL}
            onEnded={markAsWatched}
          />

          <Text>{movieDetails?.title}</Text>

          {rating && <Text>You rated this movie {rating?.rating}/5</Text>}
          <Button onClick={rateMovie}>
            {' '}
            {rating ? 'Show rating' : 'Rate this movie'}
          </Button>
        </Wrapper>
      )}
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

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;
