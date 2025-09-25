import { useState } from "react";
import Button from "../shared/button";
import Input from "../shared/input";

function PaymentComponent({tab}:{tab:number}) {
    const defaultAmount = [100, 200, 500, 1000, 2000, 5000];
    const [selectedAmount,setSelectedAmount] = useState<number | null>(null);
    return (
        <div className="py-4 px-4 border border-gray-600/90 rounded-lg ">
            <h1 className="text-xl  mb-4 text-gray-700 capitalize">{
                tab === 0 ? "Deposit Money ":"Withdraw Money"
                }

            </h1>

            <p className="text-gray-200 capitalize py-2 text-sm">Default Amount</p>
            <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-hide">
                {
                    defaultAmount.map((amount)=>(
                        <div key={amount}
                        onClick={()=>setSelectedAmount(amount)}
                        className={`border  rounded-lg p-2 text-center cursor-pointer ${selectedAmount === amount ? 'border-gray-400 bg-orange-50':'border-gray-600'}`}>
                            <span className="text-gray-700 font-medium">{amount}</span>
                        </div>
                    ))
                }
                </div>
                <Input 
                label="Amount"
                type="number"
                placeholder="Enter amount"
                value={selectedAmount ? selectedAmount.toString() : ''}
                onChange={(e)=>setSelectedAmount(Number(e))}
                />
                <Button
                disabled={!selectedAmount}
                className="w-full mt-4"
                onClick={()=>console.log(tab === 0 ? "Depositing ":"Withdrawing ", selectedAmount)}
                >
                    {
                        tab === 0 ? "Deposit Money ":"Withdraw Money"
                    }
                </Button>
        </div>
    )
}

export default PaymentComponent
