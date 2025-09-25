"use client";

import { sideBarLinks } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNavigation() {
    const path = usePathname();
  return (
    <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-primary text-base-content min-h-full w-64 p-4">
      {/* Sidebar content here */}
      <li className="py-2">
        <Link href="/" className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          NG
        </Link>
      </li>

      {
        sideBarLinks.map(({title,url,Icon})=>(
            <li key={url}>
                <Link href={url} className={`flex items-center space-x-2 text-gray-500 border  ${path === url ? 'border-orange-400':'border-transparent'}`}>
                <Icon size={20} />
                <span>{title}</span>
                </Link>
            </li>
        ))
      }
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
  );
}

export default SideNavigation;
