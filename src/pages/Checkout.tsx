import { useGetUsers } from '@/apis/public';

export default function CheckoutPage() {
  const { data } = useGetUsers();

  return <section>CheckoutPage</section>;
}
