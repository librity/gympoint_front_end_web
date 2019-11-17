import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-45deg, #ff9538, #fd0058);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;
  background: #fff;
  border-radius: 6px;
  padding: 50px 30px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      font-size: 14px;
      color: #444444;
      text-align: left;
      font-weight: bold;
      margin: 10px 0;
    }

    input {
      background: #fff;
      border: 1px solid #dcdcdc;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      font-size: 16px;
      color: #444;
      margin: 0 0 10px;

      &::placeholder {
        color: #999999;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #fd0058;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#FD0058')};
      }
    }
  }
`;
