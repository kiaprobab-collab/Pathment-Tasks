import React from 'react'

export const CenterComponent = (props) => {
  return (
    <div style={{ alignItems:"center",justifyContent: "center"}}>
        {props.children}
    </div>
  )
}
