import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
  color: #de3b3b;
  &:hover {
    color: ${darken(0.1, '#de3b3b')};
  }
`;
