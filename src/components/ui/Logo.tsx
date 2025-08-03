import React from 'react'
import logo from "../../assets/agma-header.jfif";

const Logo = ({ className } : { className?: string }) => {
  return (
    <img className={`${className}`} src={logo} alt="" />
  )
}

export default Logo
