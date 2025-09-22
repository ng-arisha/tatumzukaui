"use client";

import { Clock } from "lucide-react";
import { useState } from "react";
import Button from "../shared/button";
import Card from "../shared/card";
import Input from "../shared/input";

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function BetForm() {
     const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
     const onSelectNumber = (num: number) => {
        setSelectedNumbers((prev) => [...prev, num]);
      };
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
                value={0}
                onChange={(val) => console.log(val)}
                placeholder="Enter amount in USD"
                required
                Icon={Clock}
              />
            </div>
            {/* place bet button */}
            <div className="mt-4 text-center">
              <Button
                variant="primary"
                onClick={() => console.log("Place Bet")}
                disabled={selectedNumbers.length !== 3}
              >
                Place Bet
              </Button>
            </div>
          </Card>
    )
}

export default BetForm
