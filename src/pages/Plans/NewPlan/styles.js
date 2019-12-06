import styled from 'styled-components';

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
    }
  }
`;
