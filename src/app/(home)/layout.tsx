function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-4 py-12 md:py-24 lg:py-32 xl:py-48 md:px-8 lg:px-12 xl:px-16 2xl:px-[30rem] min-h-screen ">
      {children}
    </div>
  );
}

export default HomeLayout;
