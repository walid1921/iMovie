import React, { useState } from "react";

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">

      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>


      {isOpen && children}
      {/* we used the children to make the Box reusable */}
    </div>
  )
}

export default Box
