import styled from 'styled-components';

export const Content = styled.div`
  /* all: initial; */

  background: #fff;
  border-radius: 4px;
  padding: 30px;

  width: 60%;
  height: 100%;
  margin-top: 40px;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    label:first-child {
      margin: 0 0 15px 5px;
    }

    label {
      font-size: 14px;
      color: #444444;
      text-align: left;
      font-weight: bold;
      margin: 15px 5px;
    }

    span {
      * {
        text-indent: 10px;
      }

      color: #fb6f91;
      font-weight: bold;

      display: flex;
      flex-direction: row;
      width: 100%;
      margin-right: 15px;
      margin-top: 15px;

      span {
        flex-direction: column;
        width: 100%;

        .unformInput {
          width: 100%;
          height: 60px;
        }

        .unformInput::placeholder {
          font-size: 16px;
          color: #a2a2a2;
          text-align: left;
        }
      }
    }

    span:last-child {
      margin-right: 0;
    }
  }
`;
