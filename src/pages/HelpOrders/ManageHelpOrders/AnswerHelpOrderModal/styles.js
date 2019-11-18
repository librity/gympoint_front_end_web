import styled from 'styled-components';
import { darken } from 'polished';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

export const HelpOrderModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HelpOrderFade = styled(Fade)`
  border: 0;
  border-radius: 4px;
  padding: 30px;
  width: 25%;
  height: 35%;
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

  p {
    font-size: 16px;
    color: #666666;
    line-height: 26px;
    text-align: left;
    height: 40%;
  }

  textarea {
    resize: none;
    width: 100%;
    height: 100px;
    border-radius: 4px;
    border: 1px solid #dcdcdc;
    padding: 15px;
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
