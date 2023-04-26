import { useTranslation } from 'react-i18next';
import Some from './components/some';
import { useAuthContext } from './context/auth';

export default function App() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthContext();
  console.log('app run');
  console.log(isAuthenticated);
  return (
    <>
      <h1 className='text-3xl font-bold underline'>{t('hello')}</h1>
      <Some />
    </>
  );
}
