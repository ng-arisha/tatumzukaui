import TopNavigation from "@/components/navigation/top-navigation";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full  min-h-screen ">
      <TopNavigation/>
      <div className="px-4 py-12 m md:px-8 lg:px-12 xl:px-16 2xl:px-[30rem]">
      {children}
      </div>
     
    </div>
  );
}

export default HomeLayout;
