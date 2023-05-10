import Hero from '@/components/home/Hero';
import NewArrival from '@/components/home/NewArrival';
import Category from '@/components/home/category';

export default function HomePage() {
  return (
    <section className="container min-h-screen">
      <Hero />
      <NewArrival />
      <Category />
    </section>
  );
}
