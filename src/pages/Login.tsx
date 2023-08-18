import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLogin } from '@/apis/auth';
import TextInput from '@/components/controllers/TextInput';
import PasswordInput from '@/components/controllers/PasswordInput';
import Checkbox from '@/components/controllers/Checkbox';
import Button from '@/components/UI/MyButton';

type TLoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function LoginPage() {
  const { t } = useTranslation('auth');
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
      <div className="grid grid-cols-2 items-center rounded-md p-16 px-40">
        <div>
          <h1 className="mb-6 w-2/3 text-4xl font-semibold text-gray-800">
            {t('login-title')}
          </h1>
          <p className="mb-10 w-5/6 text-gray-500">{t('login-desc')}</p>
          <Link to="/sign-up">
            <button
              type="button"
              className="rounded-md border border-gray-300 px-10 py-3 font-semibold text-gray-800"
            >
              {t('create-new-account')}
            </button>
          </Link>
        </div>

        {/* -------------------------------------------------- */}

        <div className="rounded-md bg-white p-8 py-10">
          <div className="flex min-h-full w-full">
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
                      placeholder={t('email-address')!}
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
                      placeholder={t('password')!}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Checkbox<TLoginFormValues>
                      label={t('remember-me')}
                      name="rememberMe"
                      id="rememberMe"
                    />

                    <div className="text-sm">
                      <Link
                        to="/forgot-password"
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        {t('forgot-password')}
                      </Link>
                    </div>
                  </div>
                  <Button type="submit" isLoading={isLoading}>
                    {t('sign-in')}
                  </Button>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
