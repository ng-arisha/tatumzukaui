


function Button({children, onClick,variant,className,disabled}: {children: React.ReactNode, onClick: () => void, variant?: "primary" | "secondary" | "danger", className?: string, disabled?: boolean}) {
    const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
    const variants = {
        primary: "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:shadow-lg hover:shadow-yellow-400/25 hover:from-yellow-300 hover:to-orange-400",
        secondary: "bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600",
        danger: "bg-red-600 text-white hover:bg-red-500"
      };
    return (
        <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} ${variant ? variants[variant] : variants.primary} ${className}`}
        disabled={disabled}
        >
           {children} 
        </button>
    )
}

export default Button
