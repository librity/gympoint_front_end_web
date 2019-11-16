import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 10px;
  border: 1px solid #dcdcdc;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      margin-left: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-size: 15px;
      font-weight: bold;
      margin-right: 20px;
      color: #999999;
      text-align: left;

      &:hover {
        color: #444444;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      font-size: 14px;
      font-weight: bold;
      color: #666666;
      text-align: right;
    }

    button {
      border: 0;
      background: none;
      font-size: 14px;
      color: #de3b3b;
      text-align: right;

      &:hover {
        color: ${darken(0.1, '#de3b3b')};
      }
    }
  }
`;
