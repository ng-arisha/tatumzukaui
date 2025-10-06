"use client";

import PaymentComponent from "@/components/payments/payment";
import { logout, setUserFromToken } from "@/lib/auth/auth";
import { AppDispatch, RootState } from "@/lib/store";
import { getUserBalance } from "@/lib/user/user";
import { formatCurrency, transactionsTab } from "@/utils/utils";
import { Loader2Icon, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state:RootState) => state.auth.user);
  const wallet = useSelector((state:RootState) => state.user.wallet);
  const loading = useSelector((state: RootState) => state.user.loading);
  const handleChangeTab = (index: number) => {
    setActiveTab(index);
  };
  useEffect(() => {
    dispatch(setUserFromToken())
    dispatch(getUserBalance());
  }, [dispatch]);
  

  const handleLogout = () => {
    dispatch(logout())
    router.push('/login')
  }
  return (
    <div className="flex flex-col items-center">
      <div className="py-1 w-full lg:max-w-md">
        <div className="py-4 px-4 border border-orange-500/90 rounded-lg flex space-x-2 items-center">
          <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse">
            <User size={48} className="text-gray-400 m-2" />
          </div>
          <div className="flex flex-col space-y-2 text-gray-500">
            {user && <span className="font-medium">{user.phone}</span>}
            <span className="text-sm text-gray-500">
              {loading === "pending" ? (
                <Loader2Icon className="animate-spin" size={16} />
              ) : (
                formatCurrency(wallet?.balance || 0)
              )}
            </span>
          </div>
        </div>

        <div className="flex justify-between lg:justify-start lg:space-x-6 items-center mt-8 mb-4 w-full">
          {transactionsTab.map(({ title, Icon }, index) => (
            <div
              key={index}
              onClick={() => handleChangeTab(index)}
              className={`flex space-x-2 items-center border-b-2 pb-2 cursor-pointer ${
                index === activeTab ? "border-orange-400" : "border-transparent"
              }`}
            >
              <Icon size={20} className="text-gray-500" />
              <span>{title}</span>
            </div>
          ))}
        </div>
        <div className="w-full overflow-x-auto">
          {activeTab === 0 && <PaymentComponent tab={0} />}
          {activeTab === 1 && <PaymentComponent tab={1} />}
        </div>

        <h3 className="uppercase text-lg text-gray-500 py-4">History</h3>

        <div className="w-full flex justify-center items-center text-gray-500  pb-2 space-x-2">
          <Link href="/transaction" className="text-sm">
            Transaction History
          </Link>
          <div className="h-4 w-[2px] bg-gray-400" />
          <Link href="/bet-history" className="text-sm">
            Bet History
          </Link>
        </div>

        <div onClick={handleLogout} className="mt-6 flex justify-center items-center text-orange-600  space-x-2">
          <LogOut size={16} />
          <span className="text-sm cursor-pointer">Logout</span>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
