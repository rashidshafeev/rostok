import { Skeleton } from 'shared/ui/skeleton';

export const BreadcrumbsSkeleton = () => (
  <nav className="flex items-center flex-wrap py-3">
    <Skeleton className="h-4 w-16 mr-3 mt-2" />
    <Skeleton className="h-1 w-1 rounded-full mr-3 mt-2" />
    <Skeleton className="h-4 w-24 mr-3 mt-2" />
    <Skeleton className="h-1 w-1 rounded-full mr-3 mt-2" />
    <Skeleton className="h-4 w-32 mr-3 mt-2" />
  </nav>
);