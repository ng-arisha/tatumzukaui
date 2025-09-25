"use client";

import { getUserBets } from "@/lib/bets/bet";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, formatDate } from "@/utils/utils";
import { ArrowBigLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function BetList() {
    const bets = useSelector((state: RootState) => state.bets.userBets);
    const loading = useSelector((state: RootState) => state.bets.loading);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(getUserBets());
    },[dispatch]);
  return (
    <>
    {
        loading === 'pending' ? (
            <div className="h-[calc(100vh-14rem)] flex flex-col items-center justify-center text-gray-300">

                <Loader className="animate-spin" size={48} />
                <span className="text-gray-500 mt-2">Loading bets...</span>
            </div>
        ):bets.length === 0 ? (
            <div className="h-[calc(100vh-14rem)] flex flex-col items-center justify-center text-gray-300 space-y-2">
                <span className="text-red-400">You do not have any bets</span>
                <Link href="/" className="text-gray-500 flex space-x-2">
                <ArrowBigLeft size={16} />
                <span>Place a bet and come back</span>
                </Link>
            </div>
        ):(
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-gray-800">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="text-gray-500 text-xs font-normal">#</th>
            <th className="text-gray-500 text-xs font-normal">Guess</th>
            <th className="text-gray-500 text-xs font-normal">Amount</th>
            <th className="text-gray-500 text-xs font-normal">Status</th>
            <th className="text-gray-500 text-xs font-normal">Date</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {
            bets.map((bet)=>(
                <tr key={bet.id}>
            <th>{bet.id.slice(0,4)}</th>
            <td>{bet.guess.join(",")}</td>
            <td>{formatCurrency(bet.amount)}</td>
            <td>{bet.status}</td>
            <td>{formatDate(bet.createdAt)}</td>
          </tr>
            ))
          }
        </tbody>
      </table>
    </div>
        )
    }
    </>
  );
}

export default BetList;
