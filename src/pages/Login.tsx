import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useLogin } from '@/apis/auth';
import TextInput from '@/components/controllers/TextInput';
import PasswordInput from '@/components/controllers/PasswordInput';
import Checkbox from '@/components/controllers/Checkbox';
import Button from '@/components/services/Button';

type TLoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function LoginPage() {
  const methods = useForm<TLoginFormValues>({
    defaultValues: {
      email: 'amr@tawfik.com',
      password: '123456',
      rememberMe: false,
    },
  });

  const { mutate: login, isLoading } = useLogin();

  useEffect(() => {
    localStorage.setItem(
      'ishop-remember-me',
      JSON.stringify(methods.watch('rememberMe'))
    );
  }, [methods.watch('rememberMe')]);

  const onSubmit = (values: TLoginFormValues) => login(values);

  return (
    <section className="container">
      <div className="grid items-center grid-cols-2 p-16 px-40 rounded-md">
        <div>
          <h1 className="w-2/3 mb-6 text-4xl font-semibold text-gray-800">
            Login to your DukaMarket account
          </h1>
          <p className="w-5/6 mb-10 text-gray-500">
            Login or create an account to access your latest shopping lists
            within our website and DukaMarket Shopping app.
          </p>
          <Link to="/sign-up">
            <button
              type="button"
              className="px-10 py-3 font-semibold text-gray-800 border border-gray-300 rounded-md"
            >
              Create an account
            </button>
          </Link>
        </div>

        {/* -------------------------------------------------- */}

        <div className="p-8 py-10 bg-white rounded-md">
          <div className="flex w-full min-h-full">
            <div className="w-full max-w-md">
              <FormProvider {...methods}>
                <form
                  className="w-full space-y-6"
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-4 rounded-md ">
                    <TextInput<TLoginFormValues>
                      name="email"
                      rules={{
                        required: 'email is required',
                        pattern: {
                          value: /^[\w-.]+@([\w-]+\.)+[\w-]/g,
                          message: 'invalid email',
                        },
                      }}
                      placeholder="Email address"
                    />
                    <PasswordInput
                      name="password"
                      rules={{
                        required: 'password is required',
                        minLength: {
                          value: 6,
                          message: 'password must be at least 6 characters',
                        },
                      }}
                      placeholder="Password"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Checkbox<TLoginFormValues>
                      label="Remember Me"
                      name="rememberMe"
                      id="rememberMe"
                    />

                    <div className="text-sm">
                      <Link
                        to="/forgot-password"
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                  <Button isLoading={isLoading}>Sign in</Button>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
