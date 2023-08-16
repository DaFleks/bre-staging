interface DashboardStatProps {
  text: string;
  subtext: string;
}

const DashboardHeader: React.FC<DashboardStatProps> = ({ text, subtext }) => {
  return (
    <div className="mb-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-3">{text}</h1>
      <h3 className="text-sm sm:text-xl text-muted-foreground">{subtext}</h3>
    </div>
  );
};
export default DashboardHeader;
