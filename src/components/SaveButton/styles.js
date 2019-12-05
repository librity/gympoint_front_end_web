import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  text-align: center;
  margin-left: 20px;
  padding: 8px 20px;
  background: #fd0058;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.03, '#FD0058')};
  }

  svg {
    margin-right: 8px;
  }
`;
