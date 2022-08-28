import styled, { css } from 'styled-components'

interface SliderProps {
  backgroundSize: () => number
  currentStatusColor: string
}

export const SliderContainer = styled.div`
  position: relative;

  margin: 0 0.625rem;
`

export const SliderMarks = styled.div`
  position: absolute;
  bottom: 1.5px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

interface SliderMarksProps {
  active: boolean
  currentStatusColor: string
}

export const SliderMark = styled.div<SliderMarksProps>`
  width: 6px;
  height: 12px;

  border-radius: 3px;

  background: ${({ active, theme, currentStatusColor }) =>
    active ? currentStatusColor : theme['grey-100']};

  cursor: pointer;
`

export const Slider = styled.input<SliderProps>`
  width: 100%;
  height: 6px;

  border-radius: 3px;

  background: ${({ theme }) => theme['grey-100']};

  background-image: ${({ currentStatusColor }) =>
    css`linear-gradient(${currentStatusColor}, ${currentStatusColor})`};
  background-repeat: no-repeat;
  background-size: ${({ backgroundSize }) => backgroundSize}% 100%;

  outline: none;

  -webkit-appearance: none;

  appearance: none;

  /* -webkit- (Chrome, Opera, Safari, Edge) | -moz- (Firefox) */

  ::-webkit-slider-thumb {
    width: 6px;
    height: 1.5rem;

    border-radius: 3px;

    background: ${({ currentStatusColor }) => currentStatusColor};

    -webkit-appearance: none;

    appearance: none;
    cursor: pointer;
  }

  -moz-range-thumb {
    width: 6px;
    height: 1.5rem;

    border-radius: 3px;

    background: ${({ theme }) => theme['grey-100']};

    cursor: pointer;
  }
`

export const LabelsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    cursor: pointer;
  }
`
