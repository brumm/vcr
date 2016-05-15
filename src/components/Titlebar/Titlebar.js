import React from 'react'
import Flex from 'flex-component'
import { Titlebar, TitlebarUnfocused } from './Titlebar.scss'

export default props => (
  <Flex
    className={props.isFocused ? Titlebar : TitlebarUnfocused}
    alignItems='center'
    justifyContent='center'
  >
    {props.title}
  </Flex>
)
