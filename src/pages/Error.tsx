import { Link } from 'react-router-dom';
import errorVideo from '../assets/error.mp4';

export default function Error() {
  return (
    <div className="container flex flex-col items-center justify-start gap-8 py-12 bg-white rounded-md">
      <video muted autoPlay loop>
        <source src={errorVideo} type="video/mp4" />
      </video>
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-extrabold text-neutral-800">
          Oops! Something went wrong :(
        </h1>
        <div className="text-gray-500">
          <p className="mb-2">
            the page you are looking for can&apos;t be found.
          </p>
          <p>Maybe the links below can be helpful.</p>
          <p>
            Go back to DukaMarket{' '}
            <Link to="/" className="underline">
              homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Oops! Something went wrong :(
//   The page you are looking for can't be found.

//   Maybe the links below can be helpful.

//   Go back to the IKEA homepage
