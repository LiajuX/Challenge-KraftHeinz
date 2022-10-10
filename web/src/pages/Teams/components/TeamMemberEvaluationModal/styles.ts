import styled, { css } from 'styled-components'

import { Textarea } from '../../../../components/Form/Textarea'

export const TeamMemberEvaluationModalContainer = styled.div`
  position: relative;

  height: calc(70vh - 2.625rem);

  padding: 1.75rem 4.875rem 0;

  strong {
    color: ${({ theme }) => theme['grey-300']};

    font-size: 1rem;
  }

  h3 {
    margin: 1.0625rem 0 2.125rem;

    color: ${({ theme }) => theme['blue-800']};

    font-size: 1.25rem;
  }

  hr {
    height: 1px;

    margin: 2.125rem 0;
    border: none;

    background: ${({ theme }) => theme['grey-100']};
  }

  span,
  label {
    display: block;

    color: ${({ theme }) => theme['grey-300']};

    font-size: 0.75rem;
    font-weight: bold;
  }

  p {
    margin: 1.0625rem 0 2.125rem;

    font-size: 0.9375rem;
  }
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5625rem;

  margin: 1rem 0;

  img {
    width: 4rem;
    height: 4rem;

    border-radius: 50%;
  }

  h3 {
    margin: 0;
  }
`

export const SliderContainer = styled.div`
  margin: 2rem 1.1875rem;
`

export const TextareaComponent = styled(Textarea)`
  margin: 2rem 0;
`

export const BinaryButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  margin-top: -1rem;
`

interface BinaryButtonProps {
  isActive: boolean
}

export const BinaryButton = styled.button<BinaryButtonProps>`
  width: 7rem;
  height: 2.25rem;

  border: 1px solid ${({ theme }) => theme['grey-200']};
  border-radius: 3px;

  background: transparent;

  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;

  transition: all 0.4s;

  ${({ isActive, theme }) =>
    isActive &&
    css`
      border-color: ${({ theme }) => theme.black};
    `}

  &:hover {
    border-color: ${({ theme }) => theme.black};
  }
`

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0rem;
  left: calc(50% - 5rem);
`
