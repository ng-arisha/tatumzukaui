"use client"

import { AppDispatch, RootState } from "@/lib/store";
import { setVariant } from "@/lib/variants/variant";
import { useDispatch, useSelector } from "react-redux";

function SelectGameVariant() {
    const variants = useSelector((state:RootState) => state.variants.variants);
    const activeVariant = useSelector((state:RootState) => state.variants.variant);
    const dispatch = useDispatch<AppDispatch>();

    const onSelectVariant = (variant:{label:string, value:string,count:number}) => {
        dispatch(setVariant(variant));
    }
    return (
        <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-hide">
            {
                variants.map((variant)=>(
                    <div key={variant.value}
                    onClick={() => onSelectVariant(variant)}
                    className={`  rounded-lg p-2 text-center cursor-pointer ${
                        variant.value === activeVariant?.value ? 'bg-orange-500 text-gray-50':'bg-gray-700 text-gray-500 hover:bg-gray-600'
                    }`}>
                        <span className="">{variant.label}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default SelectGameVariant
