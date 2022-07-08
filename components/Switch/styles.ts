import styled from '@emotion/styled'


export const CheckBoxWrapper = styled('div')`
  position: relative;
`;

export const CheckBoxLabel = styled('label')`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 34px;
  border-radius: 30px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    height: 26px;
    width: 26px;
    left: 4px;
    margin: 4px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

export const CheckBox = styled('input')`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + label {
    background: #3c3c3c;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      height: 26px;
      width: 26px;
      margin-left: 30px;
      transition: 0.2s;
    }
  }`;