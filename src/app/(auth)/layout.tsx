function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer flex flex-col bg-primary min-h-screen items-center justify-center p-4">
      {children}
    </div>
  );
}

export default AuthLayout;
