import BetList from "@/components/bets/bet-list"

function BetHistoryPage() {
    return (
        <div className="py-2">
           <h1 className="text-gray-500 py-2">Bet History</h1> 
           <BetList />
        </div>
    )
}

export default BetHistoryPage
