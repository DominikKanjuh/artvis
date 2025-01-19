import { Skeleton } from "components/components/ui/skeleton";

function TimelineSkeleton() {
  return (
    <div className="w-full max-h-[126px] max-w-xl p-4 bg-cream rounded-lg shadow-md">
      <Skeleton className="w-fit">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-coffee mb-4 opacity-0">
          Timeline: 1905-1915
        </h2>
      </Skeleton>
      <div className="relative mb-4">
        <Skeleton className="h-[6px] ml-4" />
        <Skeleton className="absolute top-[-5px] left-0 h-4 w-4 rounded-full" />
      </div>
      <Skeleton className="w-fit sm:mx-auto">
        <p className="text-left sm:text-center text-lg font-semibold text-coffee mt-4 opacity-0">
          Selected Year: 1905
        </p>
      </Skeleton>
    </div>
  );
}

export default TimelineSkeleton;
