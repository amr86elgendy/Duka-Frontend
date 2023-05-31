import { BiLike } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import avatar from '@/assets/avatar.svg';

type TReviewComment = {
  comment: string;
  rating: number;
  user: { _id: string; name: string };
  updatedAt: string;
};

export default function ReviewComment({
  comment,
  rating,
  user,
  updatedAt,
}: TReviewComment) {
  const date = new Date(updatedAt);
  const time = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date);

  return (
    <div className="flex items-start gap-2 border-b pb-6 ">
      <div className="h-14 min-w-max rounded-full bg-slate-200">
        <img src={avatar} className="w-14 object-cover" alt="" />
      </div>
      <div>
        <h1 className="text-gray-800">{user.name}</h1>
        <div className="mb-1 flex text-yellow-500">
          {[...Array(5).keys()].map((el) => (
            <AiFillStar
              key={el}
              className={el + 1 <= rating ? '' : 'text-gray-300'}
            />
          ))}
        </div>
        <p className="mb-3 text-gray-400">{time}</p>
        <p className="mb-6 flex-wrap text-lg">{comment}</p>
        <div className="flex items-center gap-2 text-gray-400">
          <BiLike size={24} />
          <p>124</p>
        </div>
      </div>
    </div>
  );
}
