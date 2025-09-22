import { useEffect, useState } from "react";

export function useCountdown(targetTime:Date | null){
    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        if (!targetTime) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const diff = targetTime.getTime() - now;

            setTimeLeft(diff > 0 ? diff : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetTime]);

    return {
        minutes: Math.floor(timeLeft / 1000 / 60),
        seconds: Math.floor((timeLeft / 1000) % 60),
        isTimeUp: timeLeft <= 0
    }
}