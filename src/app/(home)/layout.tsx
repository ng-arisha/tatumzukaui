import SideNavigation from "@/components/navigation/side-navigation";
import TopNavigation from "@/components/navigation/top-navigation";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col w-full  min-h-screen">
        <TopNavigation />
        {/* Page content here */}

        <div className="px-4 py-12 m md:px-8 lg:px-12 xl:px-16 2xl:px-[30rem]">
          {children}
        </div>
      </div>
      {/* side navigation */}
      <SideNavigation />
    </div>
  );
}

export default HomeLayout;
