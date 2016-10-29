import React from 'react'
import Flex from 'flex-component'
import { Link, withRouter } from 'react-router'

import style from './Categories.scss'

const Categories = ({ items, router, pathname }) => (
  <Flex className={style.Container}>
    {items.map(({ id, title }) => {
      let isActive = pathname.includes(id)
      return isActive ? (
        <Flex
          key={id}
          className={style.LinkContainerActive}
        >
          <Link to={`/browse/${id}/popular`} activeClassName={style.linkActive} className={style.link}>
            Popular
          </Link>
          <Link to={`/browse/${id}/new`} activeClassName={style.linkActive} className={style.link}>
            New
          </Link>
        </Flex>
      ) : (
        <Link
          to={`/browse/${id}/popular`}
          key={id}
          className={style.LinkContainer}
        >
          <div className={style.link}>{title}</div>
        </Link>
      )
    })}
  </Flex>
)

export default withRouter(Categories)
