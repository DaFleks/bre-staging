"use client";

const Container = ({
  children,
  double,
  upDown,
  leftRight,
}: {
  children?: React.ReactNode;
  double?: boolean;
  around?: boolean;
  upDown?: boolean;
  leftRight?: boolean;
}) => {
  return (
    <div
      className={`w-full max-w-screen-lg mx-auto
      ${double && "p-6"} 
      ${upDown && "py-3"} 
      ${leftRight && "px-3"}
      `}
    >
      {children}
    </div>
  );
};
export default Container;
