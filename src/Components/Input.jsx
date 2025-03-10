import React, {useId} from 'react';

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    //useId() will give a unique id.
    return(
        <div className='w-full'>
            { label && <label className='inline-block mb-1 pl-1' htmlFor={id}>{label}</label>}
            <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-300 duration-200 border-2 border-gray-700 w-full ${className}`} ref={ref} {...props} id={id} />
        </div>
    )
})

export default Input