import PaymentList from "@/components/payments/payment-list"


function TransactionsPage() {
    return (
        <div className="py-2">
            <h1 className="text-lg text-gray-500 uppercase pb-2">Transactions</h1>

            <PaymentList />
        </div>
    )
}

export default TransactionsPage
