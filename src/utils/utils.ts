import { BetweenHorizonalEndIcon, Clock10Icon, Download, Home, Upload, User2Icon } from "lucide-react";
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

  export const formatDate =(dateString:string)=>{
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US',{
        year:'numeric',
        month:'short',
        day:'numeric',
        hour:'2-digit',
        minute:'2-digit'
    });
  }

  export const sideBarLinks = [
    {
      title:"Home",
      url:"/",
      Icon:Home
    },
    {
      title:"Profile",
      url:"/profile",
      Icon:User2Icon
    },
    {
      title:"Bet History",
      url:"/bet-history",
      Icon:BetweenHorizonalEndIcon
    },
    {
      title:"Transactions",
      url:"/transaction",
      Icon:Clock10Icon
    },
   
  ]

  export const transactionsTab = [
    {
      title:"Deposit",
      Icon:Upload
    },
    {
      title:"Withdraw",
      Icon:Download
    }
  ]