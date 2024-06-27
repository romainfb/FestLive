import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function FestivalDetailSkeleton() {
  return (
    <section className="w-full min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full px-4 md:px-6 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Skeleton className="w-full h-48 md:h-96 rounded-lg object-cover" />
          </div>
          <div className="space-y-6">
            <div>
              <Skeleton className="h-6 w-1/2 rounded-md" />
              <Skeleton className="h-4 w-full mt-2 rounded-md" />
              <Skeleton className="h-4 w-5/6 mt-2 rounded-md" />
            </div>
            <div>
              <Skeleton className="h-6 w-1/3 rounded-md" />
              <Skeleton className="h-4 w-full mt-2 rounded-md" />
            </div>
            <div>
              <Skeleton className="h-6 w-1/3 rounded-md" />
              <Skeleton className="h-4 w-full mt-2 rounded-md" />
            </div>
            <div>
              <Skeleton className="h-6 w-1/3 rounded-md" />
              <Skeleton className="h-4 w-full mt-2 rounded-md" />
            </div>
            <div>
              <Skeleton className="h-6 w-1/3 rounded-md" />
              <Skeleton className="h-4 w-full mt-2 rounded-md" />
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-16">
          <Skeleton className="h-8 w-1/4 rounded-md" />
          <div className="grid gap-6 mt-6">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-4 md:p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
              <Skeleton className="h-4 w-full mt-4 rounded-md" />
              <Skeleton className="h-4 w-5/6 mt-2 rounded-md" />
              <Skeleton className="h-4 w-3/4 mt-2 rounded-md" />
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-4 md:p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </div>
              <Skeleton className="h-4 w-full mt-4 rounded-md" />
              <Skeleton className="h-4 w-5/6 mt-2 rounded-md" />
              <Skeleton className="h-4 w-3/4 mt-2 rounded-md" />
            </div>
          </div>
        </div>
        <Skeleton className="h-8 w-1/4 mt-12 md:mt-16 rounded-md" />
        <div className="mt-8 bg-white dark:bg-gray-950 rounded-lg shadow-lg p-4 md:p-6">
          <Skeleton className="h-8 w-1/3 rounded-md" />
          <div className="mt-4 grid gap-4">
            <div className="grid gap-2">
              <Skeleton className="h-6 w-1/4 rounded-md" />
              <Skeleton className="h-24 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
