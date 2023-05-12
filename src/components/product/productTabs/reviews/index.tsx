import { useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import ReviewList from './list';
import RatingStars from '@/utils/ratingStars';

export default function ProductReviews({
  averageRating,
  numReviews,
}: {
  averageRating: number;
  numReviews: number;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(0);
  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="flex flex-col">
        <div className="pb-6 mb-6 border-b border-gray-300">
          <div className="flex items-center gap-4 mb-1">
            <h1 className="text-3xl font-semibold text-green-600">
              {averageRating} <span className="">out of 5</span>{' '}
            </h1>

            <div className="flex self-start p-4 text-green-600 bg-gray-100 rounded-full ">
              <RatingStars averageRating={averageRating} />
            </div>
          </div>

          <div className="px-4 mb-8 font-semibold text-gray-700 border-2 border-gray-300 rounded-full text-start max-w-max">
            <h3>{numReviews} Reviews</h3>
          </div>

          <div className="flex items-center gap-4 mb-2">
            <h3>5 Star</h3>

            <div className="h-2 bg-gray-200 rounded-full w-36">
              <div className="w-4/5 h-full bg-green-600 rounded-full" />
            </div>
            <h3>84%</h3>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <h3>4 Star</h3>

            <div className="h-2 bg-gray-200 rounded-full w-36">
              <div className="w-1/2 h-full bg-green-600 rounded-full" />
            </div>
            <h3>84%</h3>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <h3>3 Star</h3>

            <div className="h-2 bg-gray-200 rounded-full w-36">
              <div className="w-1/3 h-full bg-green-600 rounded-full" />
            </div>
            <h3>84%</h3>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <h3>2 Star</h3>

            <div className="h-2 bg-gray-200 rounded-full w-36">
              <div className="w-1/4 h-full bg-green-600 rounded-full" />
            </div>
            <h3>84%</h3>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <h3>1 Star</h3>

            <div className="h-2 bg-gray-200 rounded-full w-36">
              <div className="w-0 h-full bg-green-600 rounded-full " />
            </div>
            <h3>84%</h3>
          </div>
        </div>

        <div className="">
          <h1 className="mb-4 text-3xl font-semibold text-gray-700">
            Overall rating
          </h1>
          <div className="flex gap-2 mb-1 text-gray-400">
            {[...Array(5).keys()].map((i) => {
              const ratingValue = i + 1;
              return (
                <label key={i}>
                  <button
                    type="button"
                    onClick={() => setRating(ratingValue)}
                    className={
                      ratingValue <= (rating || hover)!
                        ? 'cursor-pointer p-2 border rounded-md group'
                        : 'cursor-pointer p-2 border rounded-md'
                    }
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  >
                    {ratingValue <= (rating || hover) ? (
                      <AiFillStar className="text-yellow-500" size={32} />
                    ) : (
                      <AiOutlineStar
                        className="group-hover:text-white"
                        size={32}
                      />
                    )}
                  </button>
                  <input
                    type="radio"
                    className="hidden"
                    name="rating"
                    value={ratingValue}
                  />
                </label>
              );
            })}
          </div>
          {rating ? (
            <p className="mb-6 text-sm text-gray-400">
              Your rating is {rating} star
            </p>
          ) : (
            <p className="mb-6 text-sm text-gray-400">Click To Rate</p>
          )}
          <form className="flex flex-col gap-6">
            <div className="flex flex-col ">
              <label
                className="font-semibold text-gray-700"
                htmlFor="review-title"
              >
                Your Review
              </label>
              <input
                className="p-2 border-2 border-gray-200 rounded-md outline-none"
                type="text"
                id="review-title"
                placeholder="Example: Easy To Use"
              />
            </div>
            {/* <h3 className='font-semibold text-gray-700'>
              Would you Recommend this project to a friend
            </h3>
            <div className='flex gap-6'>
              <div className='relative flex gap-2'>
                <input
                  className='w-5 h-5 border-2 border-gray-300 rounded-full appearance-none cursor-pointer accent-red-500 checked:bg-red-500 checked:border-0'
                  type='radio'
                  id='yes'
                  value='Yes'
                  name='recommended'
                />
                <div className='pointer-events-none absolute w-2 h-2 bg-white rounded-full left-[6px] top-[6px]' />
                <label
                  className='font-semibold text-gray-700 cursor-pointer'
                  htmlFor='yes'
                >
                  Yes
                </label>
              </div>
              <div className='relative flex gap-2'>
                <input
                  className='w-5 h-5 border-2 border-gray-300 rounded-full appearance-none cursor-pointer accent-red-500 checked:bg-red-500 checked:border-0'
                  type='radio'
                  id='no'
                  value='No'
                  name='recommended'
                />
                <div className='pointer-events-none absolute w-2 h-2 bg-white rounded-full left-[6px] top-[6px]' />
                <label
                  className='font-semibold text-gray-700 cursor-pointer'
                  htmlFor='no'
                >
                  No
                </label>
              </div>
            </div>
            <div className='flex flex-col '>
              <label
                className='font-semibold text-gray-700'
                htmlFor='review-title'
              >
                Product Review
              </label>
              <input
                className='flex-wrap p-2 pb-8 border-2 border-gray-200 rounded-md outline-none'
                type='text'
                id='review-title'
                placeholder='Example: Easy To Use'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className='flex justify-between gap-4'>
              <div className='flex flex-col flex-grow'>
                <label
                  className='font-semibold text-gray-700'
                  htmlFor='review-title'
                >
                  Name
                </label>
                <input
                  className='p-2 border-2 border-gray-200 rounded-md outline-none'
                  type='text'
                  id='review-title'
                  placeholder='Example: pop99'
                />
              </div>
              <div className='flex flex-col flex-grow'>
                <label className='font-semibold text-gray-700' htmlFor='email'>
                  Email address
                </label>
                <input
                  className='p-2 border-2 border-gray-200 rounded-md outline-none'
                  type='text'
                  id='email'
                  placeholder='Example: Your@email.com'
                />
              </div>
            </div> 

            <div className='relative flex items-center gap-2'>
              <input
                className='w-5 h-5 border-2 border-gray-300 rounded-md appearance-none cursor-pointer checked:bg-red-500 checked:border-red-500 focus:outline-none'
                type='checkbox'
                id='accept'
                value='Accept'
              />
              <FaCheck
                size={12}
                className='text-white absolute left-[4px] pointer-events-none'
              />
              <label className='font-semibold text-gray-700' htmlFor='accept'>
                I accept the{' '}
                <span className='underline underline-offset-1'>
                  terms and condition
                </span>
              </label>
            </div> */}
            <button
              type="submit"
              className="self-stretch py-3 font-semibold text-white bg-red-500 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <ReviewList />
    </div>
  );
}
