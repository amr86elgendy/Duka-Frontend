import { LoaderIcon } from '@/assets/icons';

export default function LoaderFallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoaderIcon width="60" height="60" />
    </div>
  );
}
