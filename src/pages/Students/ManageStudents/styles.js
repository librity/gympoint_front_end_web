import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    width: 80%;
    height: 100%;
    margin: 40px 0 20px 0;

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

      .navigateNewStudent {
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

      form {
        display: flex;
        flex-direction: row;
        justify-content: baseline;

        .search {
          position: relative;
          left: 30px;

          border: 0;
          background: none;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        input {
          width: 250px;
          text-indent: 30px;
        }

        input::placeholder {
          font-size: 14px;
          color: #999999;
          text-align: left;
        }
      }
    }
  }
`;

export const Content = styled.table`
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  width: 80%;
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    color: #444444;
  }

  tbody {
    tr td {
      text-align: left;
      padding: 15px 0;
      border-bottom: 1px solid #eee;

      strong {
        font-size: 16px;
        font-weight: normal;
        color: #666666;
        text-align: left;
        line-height: 20px;
      }
    }

    tr:last-child td {
      padding-top: 15px;
      padding-bottom: 0;

      border: none;
    }
  }

  .id {
    width: 5%;
    text-align: left;
  }
  .name {
    width: 40%;
  }
  .email {
    width: 30%;
  }
  .age {
    width: 10%;
    text-align: center;
  }

  .options {
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: baseline;

    button {
      border: 0;
      background: none;
      font-size: 15px;
      text-align: right;
      margin-left: 20px;
    }

    .edit {
      color: #4d85ee;
      &:hover {
        color: ${darken(0.1, '#4d85ee')};
      }
    }
    .delete {
      color: #de3b3b;
      &:hover {
        color: ${darken(0.1, '#de3b3b')};
      }
    }
  }
`;
