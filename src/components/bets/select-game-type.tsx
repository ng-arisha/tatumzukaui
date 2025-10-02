"use client";

import { AppDispatch, RootState } from "@/lib/store";
import { setGame } from "@/lib/variants/variant";
import { useDispatch, useSelector } from "react-redux";

function SelectGameType() {
    const games = useSelector((state: RootState) => state.variants.games);
  const game = useSelector((state: RootState) => state.variants.game);
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectGame = (gameType: GameType) => {
    dispatch(setGame(gameType));
  }
    return (
        <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-hide">
            {
                games.map((gameType) => (
                    <div key={gameType.value}
                    onClick={() => handleSelectGame(gameType)}
                        className={`  rounded-lg p-2 text-center cursor-pointer ${
                            gameType.value === game?.value ? 'bg-orange-500 text-gray-50' : 'bg-gray-700 text-gray-500 hover:bg-gray-600'
                        }`}>
                        <span className="">{gameType.label}</span>
                    </div>
                ))
            }
        </div>
    )
}
export default SelectGameType



