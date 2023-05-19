export default function LoadingOverlay({ visible }: { visible: boolean }) {
  return (
    <div
      className={`absolute inset-0 z-10 bg-white opacity-50 ${
        visible ? 'block' : 'hidden'
      }`}
    />
  );
}
