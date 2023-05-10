import { LoaderIcon } from '@/assets/icons';

export default function LoaderFallback() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <LoaderIcon width="60" height="60" />
    </div>
  );
}
