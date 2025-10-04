"use client";

import BetForm from "@/components/bets/bet-form";
import SelectGameType from "@/components/bets/select-game-type";

import SelectGameVariant from "@/components/bets/select-game-variant";
import FirstTenRoundsDisplay from "@/components/rounds/first-ten-rounds-display";
import Card from "@/components/shared/card";
import { useCountdown } from "@/hooks/useCountdown";
import { useSocket } from "@/hooks/useSocket";
import {
  getActivePickFiveRound,
  getActiveRound,
  getInstantPickFiveActiveRound,
  getInstantPickFourActiveRound,
  getInstantPickThreeActiveRound,
  getInstantPickTwoActiveRound,
  getPickFourActiveRound,
  getPickThreeActiveRound,
  setActiveRound,
  setFirstTenPickFiveRounds,
  setFirstTenPickFourRounds,
  setFirstTenPickThreeRounds,
  setFirstTenRounds,
  setPickFiveActiveRound,
  setPickFiveInstantActiveRound,
  setPickFourActiveRound,
  setPickFourInstantActiveRound,
  setPickThreeActiveRound,
  setPickThreeInstantActiveRound,
  setPickTwoInstantActiveRound,
} from "@/lib/rounds/round";
import { AppDispatch, RootState } from "@/lib/store";
import { getUserBalance } from "@/lib/user/user";
import { addTime } from "@/utils/utils";
import { Clock, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const activePickTwoRound = useSelector(
    (state: RootState) => state.rounds.activeRound
  );
  const gameVariant = useSelector((state: RootState) => state.variants.variant);

  const activeInstantPickTwoRound = useSelector((state:RootState)=>state.rounds.activeInstantPickTwo)
  const activeInstantPickThreeRound = useSelector((state:RootState)=>state.rounds.activeInstantPickThree)
  const activeInstantPickFourRound = useSelector((state:RootState)=>state.rounds.activeInstantPickFour)
  const activeInstantPickFiveRound = useSelector((state:RootState)=>state.rounds.activeInstantPickFive)
  
  const game = useSelector((state: RootState) => state.variants.game);
  const loading = useSelector((state: RootState) => state.rounds.loading);
  const activePickThreeRound = useSelector(
    (state: RootState) => state.rounds.activePickThree
  );
  const activePickFourRound = useSelector(
    (state: RootState) => state.rounds.activePickFour
  );
  const activePickFiveRound = useSelector(
    (state: RootState) => state.rounds.activePickFive
  );
  const instantDrawRounds = gameVariant.count === 2
  ? activeInstantPickTwoRound
  : gameVariant.count === 3
  ? activeInstantPickThreeRound
  : gameVariant.count === 4
  ? activeInstantPickFourRound
  : activeInstantPickFiveRound;
  const normalDrawRounds = gameVariant.count === 2
  ? activePickTwoRound
  : gameVariant.count === 3
  ? activePickThreeRound
  : gameVariant.count === 4
  ? activePickFourRound
  : activePickFiveRound;
  const activeRound = game.value === "normal-draw" ? normalDrawRounds : instantDrawRounds;
  const dispatch = useDispatch<AppDispatch>();
  const { socket, isConnected } = useSocket();

  const [roundEndTime, setRoundEndTime] = useState<Date | null>(null);
  const [nextRoundTime, setNextRoundTime] = useState<Date | null>(null);
  const roundCountdown = useCountdown(roundEndTime);
  const nextRoundCountdown = useCountdown(nextRoundTime);

  useEffect(() => {
    dispatch(getActiveRound());
    dispatch(getPickThreeActiveRound());
    dispatch(getPickFourActiveRound());
    dispatch(getActivePickFiveRound());
    dispatch(getInstantPickTwoActiveRound());
    dispatch(getInstantPickThreeActiveRound());
    dispatch(getInstantPickFourActiveRound());
    dispatch(getInstantPickFiveActiveRound());
  }, [dispatch]);

  

  useEffect(() => {
    if (!activeRound?.createdAt) {
      console.log("Active round or createdAt is undefined");
      return;
    }
    if(game.value==="insta-play"){
      const endTime = addTime(activeRound.createdAt, 0, 5);
      setRoundEndTime(endTime);
      setNextRoundTime(new Date(endTime.getTime() + 5 * 1000));

    }else{
      const endTime = addTime(activeRound.createdAt, 4, 30);
    setRoundEndTime(endTime);
    setNextRoundTime(new Date(endTime.getTime() + 30 * 1000));
    console.log("Round:", activeRound.id);
  console.log("Created:", new Date(activeRound.createdAt));
  console.log("End:", endTime);
  console.log("Now:", new Date());
  console.log("Diff:", endTime.getTime() - new Date().getTime());
    }
    
  }, [activeRound]);

  useEffect(() => {
    if (!socket) return;

    socket.connect();

    socket.on("roundCreated", (round: RoundType) => {
      dispatch(setActiveRound(round));
      dispatch(getUserBalance());
    });

    

    socket.on("pickThreeRoundCreated", (round: RoundType) => {
      console.log("Pick Three Round Created:", round);
      dispatch(setPickThreeActiveRound(round));
      
    });

    socket.on("pickFourRoundCreated", (round: RoundType) => {
      console.log("Pick four Round Created:", round);
      dispatch(setPickFourActiveRound(round));
    });
    socket.on("pickFiveRoundCreated", (round: RoundType) => {
      console.log("Pick five Round Created:", round);
      dispatch(setPickFiveActiveRound(round));
      
    });

    socket.on("instantRoundCreated", (round: RoundType) => {
      console.log("Pick two instant Round Created:", round);
      dispatch(setPickTwoInstantActiveRound(round));
      dispatch(getUserBalance());
    });

    socket.on("pickThreeInstantRoundCreated", (round: RoundType) => {
      console.log("Pick three instant Round Created:", round);
      dispatch(setPickThreeInstantActiveRound(round));
    });

    socket.on("pickFourInstantRoundCreated", (round: RoundType) => {
      console.log("Pick four instant Round Created:", round);
      dispatch(setPickFourInstantActiveRound(round));
    });

    socket.on("pickFiveInstantRoundCreated", (round: RoundType) => {
      console.log("Pick five instant Round Created:", round);
      dispatch(setPickFiveInstantActiveRound(round));
    });

    socket.on("roundCompleted", (round: RoundType) => {
      console.log("Pick five instant Round Created:", round);
      dispatch(getUserBalance());
    });

    // round history

    socket.on("firstTenRounds", (rounds: RoundType[]) => {
      dispatch(setFirstTenRounds(rounds));
    });

    socket.on("firstTenRoundsPickThree", (rounds: RoundType[]) => {
      dispatch(setFirstTenPickThreeRounds(rounds));
    });

    socket.on("firstTenRoundsPickFour", (rounds: RoundType[]) => {
      dispatch(setFirstTenPickFourRounds(rounds));
    });

    socket.on("firstTenRoundsPickFive", (rounds: RoundType[]) => {
      dispatch(setFirstTenPickFiveRounds(rounds));
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
              Choose your Lucky numbers and Place your Bet
            </p>
          </div>
          {/* display game types(insta play and normal draw) */}
          <div className="flex justify-center items-center mt-4">
            <SelectGameType />
          </div>

          {/* game variants */}
          <div className="flex justify-center items-center mt-2">
              <SelectGameVariant />
            </div>

          {/* timer */}

          {
            game.value === "normal-draw" && (
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
                  <Card className="border-2 border-orange-400 px-6 py-3 flex flex-col justify-center items-center">
                    <div className="flex space-x-2 items-center justify-center">
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
            )
          }

          {/*Display top 10 rounds  */}
          {
            game.value === "normal-draw" && ( <FirstTenRoundsDisplay />)
          }
         

          {/* bet card */}

          <BetForm activeRound={activeRound!} />
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


