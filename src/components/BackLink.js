import React from 'react'
import { Link, withRouter } from 'react-router'

const BackLink = ({path, router, label = "Back", ...otherProps}) => path ? (
  <Link to={path} {...otherProps}>
    {label}
  </Link>
) : (
  <div {...otherProps} onClick={() => router.goBack()}>
    {label}
    {path}
  </div>
)

export default withRouter(BackLink)
