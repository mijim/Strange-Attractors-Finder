import styled from "styled-components";

export const AppContainer = styled.div`
  background: #252525;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  display: flex;

  canvas {
    width: 100%;
    height: 100%;
    border-radius: 50px;
    background: linear-gradient(145deg, #232323, #1e1e1e);
    box-shadow: 5px 5px 10px #1a1a1a, -5px -5px 10px #282828;
  }
  .canvas-container {
    display: flex;
    align-items: center;
    height: 100vh;
    padding-left: 60px;
    position: relative;
    .current-genome {
      position: absolute;
      color: #cdcdcd;
      font-size: 32px;
      text-align: center;
      width: calc(100% - 60px);
      bottom: 8%;
    }
  }
  .options-container {
    padding: 60px;
    width: 100%;
    height: 100%;
    .function-option {
      display: flex;
      align-items: center;
      margin: 20px 12px;
      position: relative;
      cursor: pointer;
      .option-radio {
      }
      .option-label {
        color: #cdcdcd;
        margin-left: 42px;
        font-size: 18px;
      }
      .option-radio {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }
      .checkmark {
        position: absolute;
        transition: all 0.2s ease;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #202020;
        border-radius: 50%;
      }

      /* On mouse-over, add a grey background color */
      &:hover .option-radio ~ .checkmark {
        background-color: #969696;
      }

      /* When the radio button is checked, add a blue background */
      .option-radio:checked ~ .checkmark {
        background-color: #1a1a1a;
      }

      /* Create the indicator (the dot/circle - hidden when not checked) */
      .checkmark:after {
        content: "";
        position: absolute;
        display: none;
      }

      /* Show the indicator (dot/circle) when checked */
      .option-radio:checked ~ .checkmark:after {
        display: block;
      }

      .checkmark:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #cdcdcd;
      }
    }
  }
  .group-buttons {
    display: flex;
    align-items: center;
    margin-top: 24px;
    input {
      font-size: 18px;
      border-radius: 12px;
      outline: none;
      padding: 18px;
      width: 100%;
      margin-right: 12px;
      color: #cdcdcd;
      border: 0;
      background: linear-gradient(145deg, #202020, #1b1b1b);
      box-shadow: 6px 6px 12px #1a1a1a, -6px -6px 12px #232323;
    }
  }
  .btn {
    letter-spacing: 1px;
    border-radius: 12px;
    font-size: 18px;
    cursor: pointer;
    color: #cdcdcd;
    text-transform: uppercase;
    padding: 20px;
    width: fit-content;
    background: linear-gradient(145deg, #202020, #1b1b1b);
    box-shadow: 6px 6px 12px #1a1a1a, -6px -6px 12px #232323;
    transition: all 0.2s ease;
  }
  .btn:hover {
    padding: 20px;
    background: linear-gradient(145deg, #202020, #1b1b1b);
    box-shadow: 5px 5px 4px #1a1a1a, -5px -5px 4px #232323;
  }
  .btn:active {
    background: linear-gradient(145deg, #1b1b1b, #202020);
    box-shadow: none;
  }
  .big-btn {
    margin-right: 12px;
    width: 100%;
    text-align: center;
  }
`;
