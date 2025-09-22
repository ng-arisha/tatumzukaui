
export function addTime(dateString: string, minutes: number, seconds: number): Date {
    const date = new Date(dateString);
    return new Date(date.getTime() + minutes * 60000 + seconds * 1000);
}

export const isClient = typeof window !== "undefined";