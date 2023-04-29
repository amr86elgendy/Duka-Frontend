import { Outlet } from 'react-router-dom';
import Topbar from './topbar';
import Header from './header';
import Navbar from './navbar';
import Footer from './footer';

export default function AppLayout() {
  return (
    <div>
      <Topbar />
      <Header />
      <Navbar />
      <main className="py-8 bg-gray-100">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
