import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden">
      <Skeleton className="w-full h-48 object-cover" />
      <div className="p-4 md:p-6">
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 mt-2 rounded-md" />
        <Skeleton className="h-4 w-1/3 mt-2 rounded-md" />
        <div className="mt-4">
          <Skeleton className="inline-flex items-center justify-center px-4 py-2 w-24 h-10 rounded-md" />
        </div>
      </div>
    </div>
  );
}
