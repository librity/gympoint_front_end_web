import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .pageHeader {
    width: 60%;
    height: 100%;
    margin-top: 40px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;

    h1 {
      font-size: 24px;
      font-weight: bold;
      color: #444444;
      text-align: right;
    }

    aside {
      display: flex;
      flex-direction: row;
      justify-content: baseline;

      .navigateManageMemberships {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        text-align: center;
        margin-left: 20px;
        padding: 8px 20px;
        background: #cbcbcb;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 14px;
        font-weight: bold;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.03, '#CBCBCB')};
        }
      }

      .submitNewMembership {
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
      }
    }
  }
`;

export const Content = styled.div`
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

    .SelectorInput * {
      text-align: left;

      input {
        width: 100%;
        height: 45px;
      }

      input::placeholder {
        font-size: 16px;
        color: #999999;
      }
    }

    .unformInput {
      width: 100%;
      height: 60px;
    }

    .unformInput::placeholder {
      font-size: 16px;
      color: #999999;
      text-align: left;
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

        .SelectorInput {
          * {
            color: #444;
            font-weight: normal;
          }

          input {
            width: 100%;
            height: 55px;
          }
        }
      }
    }

    span:last-child {
      margin-right: 0;
    }
  }
`;
