"use client";

import { getUserPayments } from "@/lib/payment/payment";
import { AppDispatch, RootState } from "@/lib/store";
import { formatCurrency, formatDate } from "@/utils/utils";
import { ArrowBigLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function PaymentList() {
  const loading = useSelector((state: RootState) => state.payment.loading);
  const payments = useSelector(
    (state: RootState) => state.payment.userPayments
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserPayments());
  }, [dispatch]);
  return (
    <>
      {loading === "pending" ? (
        <div className="h-[calc(100vh-14rem)] flex flex-col items-center justify-center text-gray-300">
          <Loader className="animate-spin" size={48} />
          <span className="text-gray-500 mt-2">Loading bets...</span>
        </div>
      ) : payments.length === 0 ? (
        <div className="h-[calc(100vh-14rem)] flex flex-col items-center justify-center text-gray-300 space-y-2">
          <span className="text-red-400">You do not have any payment</span>
          <Link href="/profile" className="text-gray-500 flex space-x-2 items-center">
            <ArrowBigLeft size={16} />
            <span>Make payment and come back</span>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-gray-800">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-gray-500 text-xs font-normal">#</th>
                <th className="text-gray-500 text-xs font-normal">Amount</th>
                <th className="text-gray-500 text-xs font-normal">Type</th>
                <th className="text-gray-500 text-xs font-normal">Refence</th>
                <th className="text-gray-500 text-xs font-normal">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <th>{payment.id.slice(0, 4)}</th>
                  <td>{formatCurrency(payment.amount)}</td>
                  <td>{payment.type}</td>

                  <td>{payment.status}</td>
                  <td>{formatDate(payment.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default PaymentList;
