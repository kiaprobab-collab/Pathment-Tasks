import React from 'react'

const Button = (props) => {

  return (
    <button onClick={props.functionality}>{props.title}</button>
  )
}

export default Button