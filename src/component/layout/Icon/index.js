import React from 'react'
import './index.css'
import PlusIcon from '../../../assets/plus-black.svg'
import MinusIcon from '../../../assets/minus-black.png'

export const ExpandIcon = () => (
  <img alt='expand' src={PlusIcon} className='customDropDownIcon' />
)

export const CollapseIcon = () => (
  <img alt='collapse' src={MinusIcon} className='customDropDownIcon' />
)