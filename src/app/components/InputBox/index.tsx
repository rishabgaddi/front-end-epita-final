import * as React from 'react';
import styled from 'styled-components/macro';

const InputBox = ({ name, type, value, placeholder, onChange }) => {
  return (
    <>
      <Wrapper>
        <Input
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin: 10px;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  border: 1px solid silver;
  background-color: black;
  border-radius: 5px;
  color: white;
`;
export default InputBox;
