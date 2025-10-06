// "use client";

// import { getFirstTenPickFiveRounds, getFirstTenPickFourRounds, getFirstTenPickThreeRounds, getFirstTenRounds } from "@/lib/rounds/round";
// import { AppDispatch, RootState } from "@/lib/store";
// import { Loader2Icon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import RoundTip from "./round-tip";

// function FirstTenRoundsDisplay() {
//     const [showAll, setShowAll] = useState(false);
//     const gameVariant = useSelector((state: RootState) => state.variants.variant);
//     const pickThreeRounds = useSelector((state: RootState) => state.rounds.pickThreeRounds);
//     const pickFourRounds = useSelector((state: RootState) => state.rounds.pickFourRounds);
//     const pickFiveRounds = useSelector((state: RootState) => state.rounds.pickFiveRounds);
//     const pickTwoRounds = useSelector((state: RootState) => state.rounds.rounds);
//     const rounds = gameVariant.count === 2 ? pickTwoRounds : gameVariant.count === 3 ? pickThreeRounds : gameVariant.count === 4 ? pickFourRounds : pickFiveRounds;
//     const loading = useSelector((state: RootState) => state.rounds.loadingRounds);
//     const dispatch = useDispatch<AppDispatch>();

//     useEffect(() => {
//         dispatch(getFirstTenRounds())
//         dispatch(getFirstTenPickThreeRounds())
//         dispatch(getFirstTenPickFourRounds())
//         dispatch(getFirstTenPickFiveRounds())
//     }, [dispatch]);
//     return (
//         <>
//         {
//             loading === 'pending' ? (
//                 <div className="h-10 flex flex-col items-center justify-center">
//                     <Loader2Icon className="animate-spin  text-gray-500" size={24} />
//                 </div>
//             ):rounds.length === 0 ?(
//                 <div className="h-10 flex flex-col items-center justify-center">
//                     <span className="text-gray-500">Previous rounds are not available available</span>
//                 </div>
//             ):(
//                 <>
//                 <h1 className="text-sm font-normal text-center text-gray-400">Last 10 Draws</h1>
//                 <div className="w-full flex justify-start items-center overflow-x-auto py-2 space-x-2">
            
//             {
//                 rounds.map((round)=>(
//                     <RoundTip key={round.id} numbers={round.numbers.join(',')} />
//                 ))
//             }
//         </div>
//                 </>
//             )
//         }
//         </>
//     )
// }

// export default FirstTenRoundsDisplay

"use client";

import {
    getFirstTenPickFiveRounds,
    getFirstTenPickFourRounds,
    getFirstTenPickThreeRounds,
    getFirstTenRounds,
} from "@/lib/rounds/round";
import { AppDispatch, RootState } from "@/lib/store";
import { Loader2Icon } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoundTip from "./round-tip";

type Round = { id: string; numbers: string[] };

export default function FirstTenRoundsDisplay() {
  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);

  const gameVariant = useSelector((s: RootState) => s.variants.variant);
  const pickThreeRounds = useSelector((s: RootState) => s.rounds.pickThreeRounds);
  const pickFourRounds = useSelector((s: RootState) => s.rounds.pickFourRounds);
  const pickFiveRounds = useSelector((s: RootState) => s.rounds.pickFiveRounds);
  const pickTwoRounds = useSelector((s: RootState) => s.rounds.rounds);
  const loading = useSelector((s: RootState) => s.rounds.loadingRounds);
  const dispatch = useDispatch<AppDispatch>();

  const rounds =
    gameVariant.count === 2
      ? pickTwoRounds
      : gameVariant.count === 3
      ? pickThreeRounds
      : gameVariant.count === 4
      ? pickFourRounds
      : pickFiveRounds;

  useEffect(() => {
    dispatch(getFirstTenRounds());
    dispatch(getFirstTenPickThreeRounds());
    dispatch(getFirstTenPickFourRounds());
    dispatch(getFirstTenPickFiveRounds());
  }, [dispatch]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Refs to hidden measurement nodes (always rendered off-screen)
  const measureItemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const setMeasureRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) measureItemRefs.current.set(id, el);
    else measureItemRefs.current.delete(id);
  };

  const measureBtnRef = useRef<HTMLButtonElement | null>(null);

  const calculateVisibleCount = () => {
    const container = containerRef.current;
    if (!container) return;
    if (expanded) {
      // no need to calculate when expanded
      setVisibleCount(null);
      return;
    }

    const containerWidth = container.clientWidth;
    const comp = getComputedStyle(container);
    // try several properties for gap (Tailwind uses gap)
    const gap = parseFloat(comp.gap || comp.columnGap || comp.rowGap || "0") || 0;
    const btnWidth = measureBtnRef.current?.getBoundingClientRect().width || 0;

    const n = rounds.length;
    let sum = 0;
    let count = 0;

    for (let i = 0; i < n; i++) {
      const el = measureItemRefs.current.get(rounds[i].id);
      const w = el ? el.getBoundingClientRect().width : 0;
      const projected = sum + (count > 0 ? gap : 0) + w;
      const remainingAfterThis = n - (i + 1);
      const extraForButton = remainingAfterThis > 0 ? gap + btnWidth : 0;

      if (projected + extraForButton <= containerWidth) {
        sum = projected;
        count++;
      } else {
        break;
      }
    }

    // If nothing fits with button, try to at least show one item (if it fits)
    if (count === 0 && n > 0) {
      const first = measureItemRefs.current.get(rounds[0].id);
      const firstW = first ? first.getBoundingClientRect().width : 0;
      if (firstW + gap + btnWidth <= containerWidth) count = 1;
    }

    // clamp safety
    count = Math.max(0, Math.min(count, rounds.length));
    setVisibleCount(count);
  };

  // Recalculate during layout after DOM updates (measurement strip is present)
  useLayoutEffect(() => {
    calculateVisibleCount();

    const ro = new ResizeObserver(() => calculateVisibleCount());
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener("resize", calculateVisibleCount);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calculateVisibleCount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rounds, expanded]);

  if (loading === "pending") {
    return (
      <div className="h-10 flex flex-col items-center justify-center">
        <Loader2Icon className="animate-spin text-gray-500" size={24} />
      </div>
    );
  }

  if (!rounds || rounds.length === 0) {
    return (
      <div className="h-10 flex flex-col items-center justify-center">
        <span className="text-gray-500">Previous rounds are not available</span>
      </div>
    );
  }

  // Decide what to render in the visible row
  const itemsToRender =
    expanded ? rounds : visibleCount === null ? rounds.slice(0, Math.min(4, rounds.length)) : rounds.slice(0, visibleCount);

  const shouldShowButton = !expanded && visibleCount !== null && rounds.length > visibleCount;

  return (
    <div className="relative w-full">
      <h1 className="text-sm font-normal text-center text-gray-400 mb-2">Last 10 Draws</h1>

      {/* Hidden measurement strip (off-screen) - always rendered so measurements are stable */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: -9999,
          top: -9999,
          visibility: "hidden",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center" }}>
          {rounds.map((r) => (
            <div key={r.id} ref={setMeasureRef(r.id)} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              <RoundTip numbers={r.numbers.join(",")} />
            </div>
          ))}

          {/* measurement button */}
          <button ref={measureBtnRef} className="text-xs text-blue-500 hover:underline font-medium">
            Show More
          </button>
        </div>
      </div>

      {/* Visible row */}
      <div
        ref={containerRef}
        className={`w-full flex items-center gap-2 transition-all duration-200 ${
          expanded ? "flex-wrap justify-center" : "flex-nowrap overflow-hidden justify-start"
        }`}
      >
        {itemsToRender.map((round) => (
          <div key={round.id} className="flex-shrink-0">
            <RoundTip numbers={round.numbers.join(",")} />
          </div>
        ))}

        {/* Inline show more / show less button */}
        {rounds.length > 0 && (
          <button
            onClick={() => setExpanded((s) => !s)}
            className="text-xs text-gray-500 hover:underline font-medium flex-shrink-0"
          >
            {expanded ? "Show Less" : shouldShowButton ? "Show More" : null}
          </button>
        )}
      </div>
    </div>
  );
}
