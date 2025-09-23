"use client";

import { placeBet } from "@/lib/bets/bet";
import { AppDispatch, RootState } from "@/lib/store";
import { getUserBalance } from "@/lib/user/user";
import { Loader2Icon, Wallet } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Card from "../shared/card";
import Input from "../shared/input";

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function BetForm() {
     const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
     const onSelectNumber = (num: number) => {
        setSelectedNumbers((prev) => [...prev, num]);
      };
      const [amount, setAmount] = useState(0);

      const dispatch = useDispatch<AppDispatch>();
      const loading = useSelector((state: RootState) => state.bets.loading);
      const activeRound = useSelector((state: RootState) => state.rounds.activeRound);

      const handlePlaceBet = async() => {
        if(selectedNumbers.length !==2){
            toast.error("Please select exactly two numbers");
            return;
        }
        if(amount <=0){
            toast.error("Please enter a valid amount");
            return;
        }
        const data = {
            roundId: activeRound!.id!,
            guess: selectedNumbers,
            amount: amount // replace with actual amount from input
        }
        await dispatch(placeBet(data));
        setSelectedNumbers([]);
        setAmount(0);
        dispatch(getUserBalance())
      }
    return (
        <Card className="py-6 px-4">
            <h1 className="text-orange-400 text-lg ">Place Bet</h1>
            <p className="text-gray-50 text-lg py-4">
              Select your lucky numbers(0-9)
            </p>

            {/* display a grid of numbers between 0-9 */}
            <div className="grid grid-cols-5 gap-4 mt-8">
              {numbers.map((num) => (
                <div
                  key={num}
                  onClick={() => onSelectNumber(num)}
                  className={` rounded-lg flex items-center justify-center h-12 w-12 cursor-pointer  transition-all ${
                    selectedNumbers.includes(num)
                      ? "bg-orange-400 text-gray-50"
                      : "bg-gray-700 text-gray-200 hover:bg-gray-700/80"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>

            {/* display selected numbers and give an option to remove a number */}
            <div className="mt-4">
              <h2 className="text-gray-300 mb-2">Selected Numbers:</h2>
              <div className="flex space-x-4">
                {selectedNumbers.map((num) => (
                  <div
                    key={num}
                    onClick={() =>
                      setSelectedNumbers((prev) =>
                        prev.filter((n) => n !== num)
                      )
                    }
                    className="bg-orange-400 text-gray-50 px-4 py-2 rounded-lg cursor-pointer hover:bg-orange-500 transition-all"
                  >
                    {num} &times;
                  </div>
                ))}
              </div>
            </div>

            {/* display an input for amount */}
            <div className="mt-4">
              <Input
                label="Bet Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e))}
                placeholder="Enter amount in USD"
                required
                Icon={Wallet}
              />
            </div>
            {/* place bet button */}
            <div className="mt-4 text-center">
              {
                loading ==='pending' ? (
                    <Loader2Icon className="animate-spin h-6 w-6 text-orange-400 mx-auto" />
                ):(
                    <Button
                variant="primary"
                onClick={handlePlaceBet}
                disabled={selectedNumbers.length !== 2}
              >
                Place Bet
              </Button>
                )
              }
            </div>
          </Card>
    )
}

export default BetForm
