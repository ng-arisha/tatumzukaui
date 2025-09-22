"use client";

import BetForm from "@/components/bets/bet-form";
import Card from "@/components/shared/card";
import { useCountdown } from "@/hooks/useCountdown";
import { useSocket } from "@/hooks/useSocket";
import { getActiveRound, setActiveRound } from "@/lib/rounds/round";
import { AppDispatch, RootState } from "@/lib/store";
import { addTime } from "@/utils/utils";
import { Clock, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const activeRound = useSelector(
    (state: RootState) => state.rounds.activeRound
  );
  const loading = useSelector((state: RootState) => state.rounds.loading);
  const dispatch = useDispatch<AppDispatch>();
  const { socket, isConnected } = useSocket();

  const [roundEndTime, setRoundEndTime] = useState<Date | null>(null);
  const [nextRoundTime, setNextRoundTime] = useState<Date | null>(null);
  const roundCountdown = useCountdown(roundEndTime);
  const nextRoundCountdown = useCountdown(nextRoundTime);

  useEffect(() => {
    dispatch(getActiveRound());
  }, [dispatch]);

  useEffect(() => {
    if (!activeRound) return;
    const endTime = addTime(activeRound.createdAt, 4, 30);
    setRoundEndTime(endTime);
    setNextRoundTime(new Date(endTime.getTime() + 30 * 1000));
  }, [activeRound]);

  useEffect(() => {
    if (!socket) return;

    socket.on("roundCreated", (round: RoundType) => {
      console.log("New round created:", round);
      dispatch(setActiveRound(round));
    });

    return () => {
      socket.off("roundCreated");
    };
  }, [socket]);
  return (
    <>
      {isConnected && loading !== "pending" ? (
        <div className="w-full ">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
              Numbers Game
            </h1>
            <p className="text-gray-500">
              Choose your three Lucky numbers and Place your Bet
            </p>
          </div>

          {/* timer */}

          <div className="flex flex-col justify-center mt-4 items-center w-full">
            {roundCountdown.isTimeUp ? (
              nextRoundCountdown.isTimeUp ? (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-300 mb-2">
                    Starting new round...
                  </h2>
                  <p className="text-gray-500">Please wait</p>
                </div>
              ) : (
                <div className="mb-4">
                  <p className="py-3 text-gray-500">Next round starts in :</p>
                  <Card className="border-2 border-orange-400 px-6 py-3">
                    <div className="flex space-x-2 items-center">
                      <Clock className="text-orange-400" size={28} />
                      <div className="text-xl font-bold text-orange-400">
                        {nextRoundCountdown.minutes}:
                        {String(nextRoundCountdown.seconds).padStart(2, "0")}
                      </div>
                    </div>
                  </Card>
                </div>
              )
            ) : (
              <div>
                <Card className="border-2 border-orange-400 px-6 py-3">
                  <div className="flex space-x-2 items-center">
                    <Clock className="text-orange-400" size={28} />
                    <div className="text-xl font-bold text-orange-400">
                      {roundCountdown.minutes}:
                      {String(roundCountdown.seconds).padStart(2, "0")}
                    </div>
                  </div>
                </Card>
                <p className="py-3 text-gray-500">
                  Time remaining in this round
                </p>
              </div>
            )}
          </div>

          {/* bet card */}

          <BetForm />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center ">
          <Loader2Icon className="animate-spin text-gray-500 mb-4" size={48} />
          <h1 className="text-2xl font-bold mb-4 text-gray-500">
            Connecting to server...
          </h1>
          <p className="text-gray-500 text-center">
            Please wait while we connect to the game server.
          </p>
        </div>
      )}
    </>
  );
}

export default HomePage;
