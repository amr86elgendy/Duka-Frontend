import { useMemo } from 'react';
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io';

export default function RatingStars({
  averageRating,
}: {
  averageRating: number;
}) {
  const starArr = useMemo(() => {
    const arr: number[] = [];
    const fullStars = Math.floor(averageRating);
    for (let i = 1; i <= fullStars; i++) {
      arr.push(1);
    }
    if (averageRating < 5) {
      const partialStar = averageRating - fullStars;
      arr.push(partialStar);
      const emptyStars = 5 - arr.length;
      for (let i = 1; i <= emptyStars; i++) {
        arr.push(0);
      }
    }
    return arr;
  }, [averageRating]);

  return (
    <div className="flex text-yellow-500 ">
      {starArr.map((key) =>
        key === 1 ? (
          <IoMdStar key={key} size={22} />
        ) : key === 0 ? (
          <IoMdStarOutline key={key} size={22} />
        ) : (
          <IoMdStarHalf key={key} size={22} />
        )
      )}
    </div>
  );
}
