"use client";

import { getFirstTenPickFiveRounds, getFirstTenPickFourRounds, getFirstTenPickThreeRounds, getFirstTenRounds } from "@/lib/rounds/round";
import { AppDispatch, RootState } from "@/lib/store";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoundTip from "./round-tip";

function FirstTenRoundsDisplay() {
    const gameVariant = useSelector((state: RootState) => state.variants.variant);
    const pickThreeRounds = useSelector((state: RootState) => state.rounds.pickThreeRounds);
    const pickFourRounds = useSelector((state: RootState) => state.rounds.pickFourRounds);
    const pickFiveRounds = useSelector((state: RootState) => state.rounds.pickFiveRounds);
    const pickTwoRounds = useSelector((state: RootState) => state.rounds.rounds);
    const rounds = gameVariant.count === 2 ? pickTwoRounds : gameVariant.count === 3 ? pickThreeRounds : gameVariant.count === 4 ? pickFourRounds : pickFiveRounds;
    const loading = useSelector((state: RootState) => state.rounds.loadingRounds);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getFirstTenRounds())
        dispatch(getFirstTenPickThreeRounds())
        dispatch(getFirstTenPickFourRounds())
        dispatch(getFirstTenPickFiveRounds())
    }, [dispatch]);
    return (
        <>
        {
            loading === 'pending' ? (
                <div className="h-10 flex flex-col items-center justify-center">
                    <Loader2Icon className="animate-spin  text-gray-500" size={24} />
                </div>
            ):rounds.length === 0 ?(
                <div className="h-10 flex flex-col items-center justify-center">
                    <span className="text-gray-500">Previous rounds are not available available</span>
                </div>
            ):(
                <>
                <h1 className="text-sm font-normal text-center text-gray-400">Last 10 Draws</h1>
                <div className="w-full flex justify-center items-center overflow-x-auto py-2 space-x-2">
            
            {
                rounds.map((round)=>(
                    <RoundTip key={round.id} numbers={round.numbers.join(',')} />
                ))
            }
        </div>
                </>
            )
        }
        </>
    )
}

export default FirstTenRoundsDisplay
