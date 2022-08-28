import styled from 'styled-components'

export const PerformanceCardContainer = styled.div`
  display: flex;
  align-items: flex-start;

  width: 34rem;
  height: 13.625rem;

  padding: 3.25rem 2.5rem;
  border-radius: 9px;

  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
`

interface PerformanceCardDetailsProps {
  potencialValue: 'A' | 'B' | 'C'
}

export const PerformanceCardDetails = styled.div<PerformanceCardDetailsProps>`
  margin-left: 2.375rem;

  strong {
    font-size: 1.25rem;

    color: ${({ theme, potencialValue }) =>
      potencialValue === 'A'
        ? theme['blue-800']
        : potencialValue === 'B'
        ? theme['blue-550']
        : theme['blue-200']};
  }

  p {
    margin-top: 0.5rem;
    font-size: 0.75rem;
  }
`
