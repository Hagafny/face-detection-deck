import React from 'react'
import * as S from './Checkbox.styles'

export const Checkbox = ({ id, ...inputProps }) => (
  <>
    <S.CheckboxInput type='checkbox' id={id} {...inputProps} />
    <S.CheckboxLabel htmlFor={id}>
      <span>
        <svg width='12px' height='8px' viewBox='0 0 14 11'>
          <polyline points='2.000 5.443, 5.357 9.000, 12.000 2.000' />
        </svg>
      </span>
    </S.CheckboxLabel>
  </>
)
