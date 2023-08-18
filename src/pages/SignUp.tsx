import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import PasswordInput from '@/components/controllers/PasswordInput';
import TextInput from '@/components/controllers/TextInput';
import Checkbox from '@/components/controllers/Checkbox';
import Button from '@/components/UI/MyButton';
import { useRegister } from '@/apis/auth';

type TRegisterFormValues = {
  name: string;
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function SignUpPage() {
  const methods = useForm<TRegisterFormValues>({
    defaultValues: { name: '', email: '', password: '', rememberMe: false },
  });

  const { mutate: register, isLoading } = useRegister();

  useEffect(() => {
    localStorage.setItem(
      'ishop-remember-me',
      JSON.stringify(methods.watch('rememberMe'))
    );
  }, [methods.watch('rememberMe')]);

  const onSubmit = (values: TRegisterFormValues) => register(values);

  return (
    <section className="container">
      <div className="grid grid-cols-2 items-center rounded-md p-16 px-40">
        <div>
          <h1 className="mb-6 w-2/3 text-4xl font-semibold text-gray-800">
            Create your DukaMarket account
          </h1>
          <p className="mb-10 w-5/6 text-gray-500">
            Login or create an account to access your latest shopping lists
            within our website and DukaMarket Shopping app.
          </p>
          <Link to="/login">
            <button
              type="button"
              className="rounded-md border border-gray-300 px-10 py-3 font-semibold text-gray-800"
            >
              Login
            </button>
          </Link>
        </div>
        <div className="rounded-md bg-white p-8 py-10">
          <div className="flex min-h-full w-full">
            <div className="w-full max-w-md">
              <FormProvider {...methods}>
                <form
                  className="w-full space-y-6"
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col gap-4 rounded-md ">
                    <TextInput<TRegisterFormValues>
                      name="name"
                      rules={{
                        required: 'name is required',
                      }}
                      placeholder="Username"
                    />
                    <TextInput<TRegisterFormValues>
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
                    <Checkbox<TRegisterFormValues>
                      label="Remember Me"
                      name="rememberMe"
                      id="rememberMe"
                    />
                  </div>

                  <Button isLoading={isLoading}>Register</Button>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
