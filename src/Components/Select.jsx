import { useId } from "react";
import React from 'react';

function Select({
  options,
  label,
  className,
  ...props
}, ref) {
  const id = useId();
  return(
    <div className="w-full">
      {label && <label htmlFor={id}></label>}
      <select {...props} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-400 duration-200 border-2 border-gray-900 w-full ${className}`}>
        {options?.map((option) => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)