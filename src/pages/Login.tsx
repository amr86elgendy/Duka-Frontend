import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/apis/auth';
import { useAuthContext } from '@/context/auth';

interface ILoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const location = useLocation();
  const from = ((location.state as any)?.from.pathname as string) || '/';

  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    defaultValues: { email: 'amr@tawfik.com', password: '123456' },
  });

  const { mutate: login } = useLogin();
  console.log(watch('rememberMe'));
  useEffect(() => {
    localStorage.setItem('remember-me', JSON.stringify(watch('rememberMe')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('rememberMe')]);

  const onSubmit = (values: ILoginFormValues) => {
    console.log(values);
    login(values, {
      onSuccess: (data) => {
        dispatch('SET_USER', data);
        navigate(from);
      },
    });
  };

  return (
    <div className="2xl:w-[1570px] w-11/12 m-auto h-screen">
      <div className="grid items-center grid-cols-2 p-16 px-40 rounded-md">
        <div>
          <h1 className="w-2/3 mb-6 text-4xl font-semibold text-gray-800">
            Login to your DukaMarket account
          </h1>
          <p className="w-5/6 mb-10 text-gray-500">
            Login or create an account to access your latest shopping lists
            within our website and DukaMarket Shopping app.
          </p>
          <button
            type="button"
            className="px-10 py-3 font-semibold text-gray-800 border border-gray-300 rounded-md"
          >
            Create an account
          </button>
        </div>

        {/* -------------------------------------------------- */}

        <div className="p-8 py-10 bg-white rounded-md">
          <div className="flex w-full min-h-full">
            <div className="w-full max-w-md">
              <form
                className="w-full space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-4 rounded-md ">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md outline-none appearance-none sm:text-sm"
                      placeholder="Email address"
                      {...register('email', {
                        required: { value: true, message: 'email is required' },
                        pattern: {
                          value: /^[\w-.]+@([\w-]+\.)+[\w-]/g,
                          message: 'invalid email',
                        },
                      })}
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      type="password"
                      {...register('password', {
                        required: {
                          value: true,
                          message: 'password is required',
                        },
                        minLength: {
                          value: 6,
                          message: 'password must be at least 6 characters',
                        },
                      })}
                      className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md outline-none appearance-none sm:text-sm"
                      placeholder="Password"
                    />
                    {errors.password && (
                      <span className="text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      type="checkbox"
                      id="rememberMe"
                      {...register('rememberMe')}
                    />
                    <label
                      id="rememberMe"
                      htmlFor="rememberMe"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-red-600 hover:text-red-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    className="w-full px-10 py-3 font-semibold text-white bg-red-500 rounded-md"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
