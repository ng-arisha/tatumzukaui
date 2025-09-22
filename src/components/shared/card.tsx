



function Card({children, className}: {children: React.ReactNode, className?: string}) {
    return (
        <div className={`bg-gray-800 rounded-lg shadow-lg border border-gray-700 ${className}`}>
            {children}
        </div>
    )
}

export default Card
