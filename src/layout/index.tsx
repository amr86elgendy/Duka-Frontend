import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Topbar from './topbar';
import Header from './header';
import Navbar from './navbar';
import Footer from './footer';

export default function AppLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto', // smooth
    });
  }, [pathname]);

  return (
    <div>
      <Topbar />
      <Header />
      <Navbar />
      <main className="bg-gray-100 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
