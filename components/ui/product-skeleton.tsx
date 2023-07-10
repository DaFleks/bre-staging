import { Skeleton } from "./skeleton";

const ProductSkeleton = ({ num }: { num: number }) => {
  const arr = new Array(num).fill(null);
  return (
    <>
      {arr.map((iterator, idx) => (
        <Skeleton key={idx} className="w-[100px] h-[20px] rounded-full bg-slate-600 mb-64 mx-auto" />
      ))}
    </>
  );
};

export default ProductSkeleton;
