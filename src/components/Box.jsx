import React, { useState } from "react";

import {IoIosArrowDropdown,  IoIosArrowDropup} from 'react-icons/io'

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">

      {/* <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button> */}

      <button 
      className="absolute top-8 right-6 p-1 rounded-full border border-blue-900 bg-blue-900 text-white text-xl font-bold cursor-pointer z-50"
      onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <IoIosArrowDropdown size={20} /> : <IoIosArrowDropup size={20}/>}
      
      </button>


      {isOpen && children}
      {/* we used the children to make the Box reusable */}
    </div>
  )
}

export default Box
