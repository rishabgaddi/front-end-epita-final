import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export function MovieCard({ movie }) {
  const navigate = useNavigate();

  const onClickMovie = () => {
    navigate(`/movie/${movie._id}`);
  };

  return (
    <>
      <Wrapper onClick={onClickMovie}>
        <Image src={movie.posterURL} alt={movie.title} title={movie.title} />
        <Text>{movie.title}</Text>
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
  width: 80px;
  margin: 0 20px;
  text-align: center;
  cursor: pointer;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
`;

const Text = styled.p`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;
