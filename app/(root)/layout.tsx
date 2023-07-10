import Navbar from "@/components/Navbar";
import Container from "@/components/Container";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <Container upDown leftRight>{children}</Container>
    </>
  );
};
export default RootLayout;
