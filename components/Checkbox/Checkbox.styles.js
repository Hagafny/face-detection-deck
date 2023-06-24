import styled from 'styled-components'
import theme from '../../theme/base';

export const CheckboxLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  user-select: none;
  cursor: pointer;

  span {
    display: inline-block;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);

    &:first-child {
      position: relative;
      width: 16px;
      height: 16px;
      border-radius: 3px;
      vertical-align: middle;
      border: 1px solid ${theme.PRIMARY};
      transition: all 0.1s ease;

      svg {
        position: absolute;
        top: 3px;
        left: 1px;
        fill: none;
        stroke: #ffffff;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 16px;
        stroke-dashoffset: 16px;
        transition: all 0.2s ease;
        transition-delay: 0.2s;
        transform: translate3d(0, 0, 0);
      }

      &:before {
        content: '';
        width: 100%;
        height: 100%;
        background: ${theme.PRIMARYn};
        display: block;
        transform: scale(0);
        opacity: 1;
        border-radius: 50%;
      }
    }
  }

  &:hover {
    span:first-child {
      border-color: ${theme.PRIMARY};
      background-color: #f4fafe;
    }
  }
`

export const CheckboxInput = styled.input`
  display: none;
  &:checked + ${CheckboxLabel} span:first-child {
    background: ${theme.PRIMARY};
    svg {
      stroke-dashoffset: 0;
    }
  }
`
