export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  })
  {
    return (
      <button 
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center bg-amber-700 ${
          outline ? "border border-yellow-50 bg-gray-500" : "bg-amber-500"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-red-500 "}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }