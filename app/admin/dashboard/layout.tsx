import Navbar from "@/components/Navbar";
import Container from "@/components/Container";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <Container double>{children}</Container>
    </>
  );
};
export default DashboardLayout;