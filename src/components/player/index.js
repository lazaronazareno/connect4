import React from "react";

export default function Player (props) {
  console.log(props)
  return (
    <div>
      <span>player {props.name} turn</span>
    </div>
  )
}