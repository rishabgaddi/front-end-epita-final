import InputBox from 'app/components/InputBox';
import { t } from 'i18next';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { uploadMovie, uploadPoster, uploadTrailer } from 'services/movie';
import { AuthState } from 'slices/authSlice';
import styled from 'styled-components';
import { AccessDeniedPage } from 'app/components/AccessDeniedPage/Loadable';

export function AddMovie() {
  const state: AuthState = useSelector((state: any) => state.auth);
  const [movieDetails, setMovieDetails] = React.useState({
    title: '',
    releaseDate: '',
    category: '',
    director: '',
  });
  const [files, setFiles] = React.useState<FileList | any>({
    poster: '',
    trailer: '',
  });

  const onChangeHandler = (
    e: React.FormEvent<HTMLInputElement> | any,
  ): void => {
    setMovieDetails({ ...movieDetails, [e.target.name]: e.target.value });
  };

  const onChangeFileHandler = (
    e: React.FormEvent<HTMLInputElement> | any,
  ): void => {
    setFiles({ ...files, [e.target.name]: e.target.files?.item(0) });
  };

  const addMovie = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate movie details and files
    const { title, releaseDate, category, director } = movieDetails;
    if (!title || !releaseDate || !category || !director) {
      return;
    }
    const body = {
      title,
      releaseDate: new Date(releaseDate).toISOString(),
      category,
      director,
    };
    try {
      const data = await uploadMovie(body);

      if (data && data.movie) {
        const posterReader = new FileReader();
        posterReader.readAsArrayBuffer(files.poster);
        posterReader.onloadend = async () => {
          const arrayBuffer = posterReader.result as ArrayBuffer;
          const buffer = new Uint8Array(arrayBuffer);
          await uploadPoster(data.movie._id, files.poster, buffer);
        };

        const trailerReader = new FileReader();
        trailerReader.readAsArrayBuffer(files.trailer);
        trailerReader.onloadend = async () => {
          const arrayBuffer = trailerReader.result as ArrayBuffer;
          const buffer = new Uint8Array(arrayBuffer);
          await uploadTrailer(data.movie._id, files.trailer, buffer);
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (state.user && state.user.type !== 'admin') {
    return <AccessDeniedPage />;
  }

  return (
    <>
      <Helmet>
        <title>Add Movie</title>
        <meta name="description" content="Add Movie Page" />
      </Helmet>
      <Wrapper>
        <Text>Add Movie</Text>
        <Form onSubmit={addMovie}>
          <InputBox
            type={'text'}
            name={'title'}
            value={movieDetails.title}
            placeholder={t('enter_movie_title')}
            onChange={onChangeHandler}
          />
          <InputBox
            type={'date'}
            name={'releaseDate'}
            value={movieDetails.releaseDate}
            placeholder={t('enter_release_date')}
            onChange={onChangeHandler}
          />
          <InputBox
            type={'text'}
            name={'category'}
            value={movieDetails.category}
            placeholder={t('enter_category')}
            onChange={onChangeHandler}
          />
          <InputBox
            type={'text'}
            name={'director'}
            value={movieDetails.director}
            placeholder={t('enter_director_name')}
            onChange={onChangeHandler}
          />
          <UploadButton
            type={'file'}
            name={'poster'}
            placeholder={t('select_movie_poster')}
            onChange={onChangeFileHandler}
          />
          <UploadButton
            type={'file'}
            name={'trailer'}
            placeholder={t('select_movie_trailer')}
            onChange={onChangeFileHandler}
          />
          <Button type={'submit'}>Add Movie</Button>
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
  font-size: 24px;
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

const UploadButton = styled.input`
  width: 300px;
  height: 40px;
  border: 3px solid silver;
  background-color: black;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;
