import React from 'react';
import styled from 'styled-components';
import InputBox from '../InputBox';

export function Address({ name, onChangeHandler, address }) {
  return (
    <>
      <Wrapper>
        <Text>{name}</Text>

        <InputBox
          name="street"
          type="text"
          placeholder="Enter street"
          value={address.street}
          onChange={onChangeHandler}
        />
        <InputBox
          name="city"
          type="text"
          placeholder="Enter city"
          value={address.city}
          onChange={onChangeHandler}
        />
        <InputBox
          name="area"
          type="text"
          placeholder="Enter area"
          value={address.area}
          onChange={onChangeHandler}
        />
        <InputBox
          name="country"
          type="text"
          placeholder="Enter country"
          value={address.country}
          onChange={onChangeHandler}
        />
        <InputBox
          name="zipCode"
          type="text"
          placeholder="Enter zip code"
          value={address.zipCode}
          onChange={onChangeHandler}
        />
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
