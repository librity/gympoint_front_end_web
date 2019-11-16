import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  text-align: center;
  border-radius: 6px;
  padding: 50px 30px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;

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
