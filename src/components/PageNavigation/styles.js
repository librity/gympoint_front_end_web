import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 8px;
    margin: 0 10px;
    background: #cbcbcb;
    color: #fff;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#CBCBCB')};
    }
  }
`;
