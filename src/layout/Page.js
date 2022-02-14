import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Page(props) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <props.element location={location} navigate={navigate}/>
  )
}
