import React from 'react'
import { Link } from 'react-router-dom'
const Logo = () => {
  return (
   <Link to="/" className="flex items-center space-x-1 md:space-x-2">
        <img
          src="/logo.png"
          className="h-7 w-7 md:h-9 md:w-9 object-contain cursor-pointer"
          alt="logo"
        />
        <span className="text-xl md:text-2xl font-semibold text-primary cursor-pointer">
          Genify.<span className="text-gray-400">ai</span>
        </span>
      </Link>

  )
}

export default Logo
