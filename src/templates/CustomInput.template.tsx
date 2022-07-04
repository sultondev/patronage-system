import styled from "styled-components";

const CustomInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px;
  margin: 8px 0;
  width: 100%;
  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`;

export default CustomInput;
