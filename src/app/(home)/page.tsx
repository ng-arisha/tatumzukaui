"use client";

import Button from "@/components/shared/button";
import Card from "@/components/shared/card";
import Input from "@/components/shared/input";
import { useSocket } from "@/hooks/useSocket";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const numbers = [0,1,2,3,4,5,6,7,8,9];

function HomePage() {
  const {socket, isConnected} = useSocket();
  const [rounds, setRounds] = useState<any[]>([]);

  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const onSelectNumber = (num: number) => {
    setSelectedNumbers((prev) => [...prev, num]);
  }


  useEffect(() => {
    if(!socket) return;

    socket.on("roundCreated",(round)=>{
      console.log("New round created:", round);
      setRounds((prev) => [...prev, round]);
    })

    return () => {
      socket.off("roundCreated");
    }
  }, [socket]);
  return (
    <div className="w-full ">
      <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
          Numbers Game
        </h1>
        <p className="text-gray-500">Choose your three Lucky numbers and Place your Bet</p>
      </div>

      {/* timer */}

      <div className="flex flex-col justify-center mt-8 items-center w-full">
        <Card className="border-2 border-orange-400 px-6 py-3">
          <div className="flex space-x-2 items-center">
           <Clock className="text-orange-400" size={28}/>
            <div className="text-xl font-bold text-orange-400">00:12</div>
          </div>
        </Card>
        <p className="py-3 text-gray-500">Time remaining in this round</p>
      </div>

      {/* bet card */}

      <Card className="py-6 px-4">
        <h1 className="text-orange-400 text-lg ">Place Bet</h1>
        <p className="text-gray-50 text-lg py-4">Select your lucky numbers(0-9)</p>

        {/* display a grid of numbers between 0-9 */}
        <div className="grid grid-cols-5 gap-4 mt-8">
          {numbers.map((num) => (
            <div key={num} onClick={()=>onSelectNumber(num)} className={` rounded-lg flex items-center justify-center h-12 w-12 cursor-pointer  transition-all ${selectedNumbers.includes(num) ? 'bg-orange-400 text-gray-50': 'bg-gray-700 text-gray-200 hover:bg-gray-700/80'}`}>
              {num}
            </div>
          ))}
        </div>

        {/* display selected numbers and give an option to remove a number */}
        <div className="mt-8">
          <h2 className="text-gray-300 mb-2">Selected Numbers:</h2>
          <div className="flex space-x-4">
            {selectedNumbers.map((num) => (
              <div key={num} onClick={() => setSelectedNumbers((prev) => prev.filter((n) => n !== num))} className="bg-orange-400 text-gray-50 px-4 py-2 rounded-lg cursor-pointer hover:bg-orange-500 transition-all">
                {num} &times;
              </div>
            ))}
          </div>
        </div>

        {/* display an input for amount */}
        <div className="mt-8">
          <Input label="Bet Amount" type="number" value={0} onChange={(val) => console.log(val)} placeholder="Enter amount in USD" required Icon={Clock}/>

        </div>
        {/* place bet button */}
        <div className="mt-8 text-center">
            <Button variant="primary" onClick={() => console.log("Place Bet")} disabled={selectedNumbers.length !== 3}>
              Place Bet
            </Button>
          </div>
      </Card>
      
    </div>
  )
}

export default HomePage
