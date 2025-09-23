import { LogOut } from "lucide-react";
import Link from "next/link";

function TopNavigation() {
  return (
    <div className="navbar bg-primary shadow-sm">
      <div className="flex-1">
        <Link
          href="/"
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2"
        >
          NG
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <span className="text-sm text-gray-500">TZS: 1200</span>
          </li>
          <li>
            
           <span className="text-gray-500 hover:text-gray-300 cursor-pointer">
           <LogOut className=" " size={24} />
           </span>
          </li>
        
         
        </ul>
      </div>
    </div>
  );
}

export default TopNavigation;
