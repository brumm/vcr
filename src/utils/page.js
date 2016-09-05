import React from 'react'

const page = name => ({children, routeParams}) => {
  return (
    <div style={{
      padding: 10,
      margin: 10,
      border: '1px solid black',
    }}>
      <div>{name}</div>
      <ul>
        {Object.keys(routeParams).map(key => (
          <li key={key}>{key}: {routeParams[key]}</li>
        ))}
      </ul>
      {children}
    </div>
  )
}

export default page
