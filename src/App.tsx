import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layout';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import ShoppingPage from './pages/Shopping';
import ProductPage from './pages/Product';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import NotFoundPage from './routes/not-found';
import RequireAuth from './routes/requireAuth';
import PersistLogin from './routes/persistLogin';

export default function App() {
  console.log('app run');
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ShoppingPage />} />
            <Route path="products/:productId" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="sign-up" element={<SignUpPage />} />

            {/* private Routes */}
            <Route element={<RequireAuth />}>
              <Route path="checkout" element={<CheckoutPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
