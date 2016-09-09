import React from 'react'
import Flex from 'flex-component'
import { Link } from 'react-router'

import style from './Categories.scss'

const Categories = ({items}) => (
  <Flex>
    {items.map(({id, title}) => (
      <Link
        to={`/browse/${id}`}
        key={id}
        className={style.link}
        activeClassName={style.linkActive}
      >
        {title}
      </Link>
    ))}
  </Flex>
)

export default Categories
