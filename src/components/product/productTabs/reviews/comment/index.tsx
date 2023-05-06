import { BiLike } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import avatar from '@/assets/avatar.svg';

type TReviewComment = {
  comment: string;
  rating: number;
  user: { name: string; email: string; role: string };
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
    <div className="flex items-start gap-2 pb-6 border-b ">
      <div className="rounded-full h-14 bg-slate-200 min-w-max">
        <img src={avatar} className="object-cover w-14" alt="" />
      </div>
      <div>
        <h1 className="text-gray-800">{user.name}</h1>
        <div className="flex mb-1 text-yellow-500">
          {[...Array(5).keys()].map((el) => (
            <AiFillStar
              key={el}
              className={el + 1 <= rating ? '' : 'text-gray-300'}
            />
          ))}
        </div>
        <p className="mb-3 text-gray-400">{time}</p>
        <p className="flex-wrap mb-6 text-lg">{comment}</p>
        <div className="flex items-center gap-2 text-gray-400">
          <BiLike size={24} />
          <p>124</p>
        </div>
      </div>
    </div>
  );
}
