import styled from 'styled-components';
import { darken } from 'polished';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

export const Button = styled.button`
  color: #de3b3b;
  &:hover {
    color: ${darken(0.1, '#de3b3b')};
  }
`;

export const HelpOrderModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HelpOrderFade = styled(Fade)`
  border: 0;
  border-radius: 4px;
  padding: 30px;
  width: 40%;
  height: 50%;
  background: #fff;

  display: flex;
  flex-direction: column;

  h3 {
    font-size: 14px;
    font-weight: bold;
    color: #444444;
    text-align: left;
    margin-bottom: 10px;
  }

  #transition-modal-sub-title {
    margin-top: 10px;
  }

  textarea {
    resize: none;
    width: 100%;
    height: 120px;
    border-radius: 4px;
    border: 1px solid #dcdcdc;
    padding: 15px;
  }

  span {
    color: #fb6f91;
    font-weight: bold;
  }

  button {
    margin-top: 15px;
    align-items: center;
    text-align: center;
    padding: 8px 20px;
    width: 100%;

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
  }
`;
