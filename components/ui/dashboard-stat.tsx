interface DashboardStatProps {
  title: string;
  stat: string | number;
  icon?: any;
}

const DashboardStat: React.FC<DashboardStatProps> = ({ title, stat, icon }) => {
  return (
    <div className="border rounded-lg p-3 w-1/3">
      <div className="text-center sm:text-left sm:flex items-center justify-between">
        <div className="mx-auto w-fit mb-3 sm:hidden">{icon}</div>
        <div className="whitespace-nowrap">
          <h3 className="text-[10px] sm:text-sm font-bold">{title}</h3>
          <h1 className="text-md sm:text-2xl font-bold">{stat}</h1>
        </div>
        <div className="hidden sm:block">{icon}</div>
      </div>
    </div>
  );
};
export default DashboardStat;
