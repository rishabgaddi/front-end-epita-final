import { NotFoundPage } from 'app/components/NotFoundPage';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMovie } from 'services/movie';
import {
  fetchRatingByMovieIdAndUsername,
  postRating,
  putRating,
} from 'services/rating';
import styled from 'styled-components';
import { Movie } from 'types/Movie';

export function RatingPage() {
  const movieId = useParams().id;
  const { user } = useSelector((state: any) => state.auth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [rating, setRating] = React.useState(0);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [movieDetails, setMovieDetails] = React.useState<Movie>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [alreadyRated, setAlreadyRated] = React.useState(false);
  const [ratingId, setRatingId] = React.useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!alreadyRated) {
      await postRating({
        rating,
        commentTitle: title,
        commentContent: content,
        username: user.username,
        movieId: movieDetails?._id,
      });
      navigate(`/movie/${movieDetails?._id}`);
    } else {
      await putRating(ratingId, {
        rating,
        commentTitle: title,
        commentContent: content,
        username: user.username,
        movieId: movieDetails?._id,
      });
      navigate(`/movie/${movieDetails?._id}`);
    }
  };

  React.useEffect(() => {
    const fetchDetails = async (id: string) => {
      try {
        const data = await fetchMovie(id);
        setMovieDetails(data.movie);

        const userRating = await fetchRatingByMovieIdAndUsername(
          data.movie._id,
          user.username,
        );
        if (userRating.rating) {
          setAlreadyRated(true);
          setRatingId(userRating.rating._id);
          setTitle(userRating.rating.commentTitle);
          setContent(userRating.rating.commentContent);
          setRating(userRating.rating.rating);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoaded(true);
      }
    };
    if (user) {
      fetchDetails(movieId!);
    }
  }, [movieId, user]);

  return (
    <>
      <Helmet>
        <title>Rate Movie</title>
        <meta name="description" content="Rating Page" />
      </Helmet>

      {!isLoaded ? (
        <Wrapper>Loading...</Wrapper>
      ) : !movieDetails ? (
        <NotFoundPage />
      ) : (
        <Wrapper>
          <Text>
            Rate - {movieDetails.title} {alreadyRated ? '(Again!)' : ''}
          </Text>

          <Form onSubmit={onSubmit}>
            <TextInput
              type={'text'}
              name={'title'}
              placeholder={t('enter_title')}
              value={title}
              onChange={handleTitleChange}
            />

            <TextArea
              onChange={handleContentChange}
              name={'content'}
              placeholder={t('enter_description')}
              value={content}
            />

            <Select
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
            >
              <Option value={0}>0</Option>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
            </Select>

            <Button type={'submit'}>Submit</Button>
          </Form>
        </Wrapper>
      )}
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
  font-size: 24px;
`;

const TextInput = styled.input`
  width: 300px;
  height: 40px;
  border: 3px solid silver;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
`;

const TextArea = styled.textarea`
  width: 300px;
  height: 100px;
  border: 3px solid silver;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Select = styled.select`
  width: 300px;
  height: 40px;
  border: 3px solid silver;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
`;

const Option = styled.option`
  width: 300px;
  height: 40px;
  border: 3px solid silver;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
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
