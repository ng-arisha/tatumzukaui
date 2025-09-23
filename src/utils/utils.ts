import { defaultCountries, parseCountry } from "react-international-phone";

export function addTime(dateString: string, minutes: number, seconds: number): Date {
    const date = new Date(dateString);
    return new Date(date.getTime() + minutes * 60000 + seconds * 1000);
}

export const isClient = typeof window !== "undefined";

export const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ["tz"].includes(iso2);
  });


  export const formatCurrency=(amount:number)=>{
    return new Intl.NumberFormat('en-TZ',{
        style:'currency',
        currency:'TZS',
        minimumFractionDigits:0,
        maximumFractionDigits:0
    }).format(amount);
  }