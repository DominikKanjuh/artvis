import { Skeleton } from "components/components/ui/skeleton";

function TimelineSkeleton() {
  return (
    <div className="bg-cream max-h-[126px] w-full max-w-xl rounded-lg p-4 shadow-md">
      <Skeleton className="w-fit">
        <h2 className="text-coffee mb-4 text-lg font-bold opacity-0 md:text-xl lg:text-2xl">
          Timeline: 1905-1915
        </h2>
      </Skeleton>
      <div className="relative mb-4">
        <Skeleton className="ml-4 h-[6px]" />
        <Skeleton className="absolute left-0 top-[-5px] h-4 w-4 rounded-full" />
      </div>
      <Skeleton className="w-fit sm:mx-auto">
        <p className="text-coffee mt-4 text-left text-lg font-semibold opacity-0 sm:text-center">
          Selected Year: 1905
        </p>
      </Skeleton>
    </div>
  );
}

export default TimelineSkeleton;
