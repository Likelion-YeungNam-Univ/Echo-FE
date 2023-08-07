import { styled } from 'styled-components';

const StyledError = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 720px;
  margin: 0 auto;
  padding-top: 160px;

  .title {
    font-size: 176px;

    background: linear-gradient(to right, #feac5e, #c779d0, #4bc0c8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .content {
    margin: 16px 0 32px;
    font-size: 24px;
  }

  a {
    text-align: center;

    button {
      width: 80px;
      height: 32px;

      background: #000000;
      color: white;
      font-weight: 600;

      &:hover {
        background-color: #cdcdcd;
      }
    }
  }
`;

export default StyledError;
