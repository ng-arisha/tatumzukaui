function RoundTip({numbers}:{numbers:string}) {
    return (
        <div className="px-4 py-2 bg-gray-700   text-orange-700 mb-4 rounded-full" role="alert">
            <span>{numbers}</span>
        </div>
    )
}

export default RoundTip
