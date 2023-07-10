const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-full bg-gradient-to-r from-slate-100 to-slate-300">
      {children}
    </div>
  );
};
export default AuthLayout;
