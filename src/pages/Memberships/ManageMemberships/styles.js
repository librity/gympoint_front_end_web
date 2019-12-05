import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .pageHeader {
    width: 90%;
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
    }
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  width: 90%;
  margin-top: 20px;
  max-height: 75vh;
`;

export const ProductTable = styled.table`
  width: 100%;
  padding: 5px 15px;

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
  .student_name {
    width: 30%;
    text-align: left;
  }
  .plan_title {
    width: 15%;
    text-align: left;
  }
  .start_date {
    width: 18%;
    text-align: center;
  }
  .end_date {
    width: 18%;
    text-align: center;
  }
  .active {
    width: 5%;
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
      padding-bottom: 5px;
      padding-top: 5px;
    }
  }
`;
