import { cn } from '@/lib/utils';

function SkeletonLoader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('skeleton w-full h-2', className)} {...props} />;
}

export { SkeletonLoader };
