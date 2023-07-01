import { useId } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppLayout from './layout';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import ShoppingPage from './pages/Shopping';
import ProductPage from './pages/Product';
import CartPage from './pages/Cart';
import WishlistPage from './pages/Wishlist';
import CheckoutPage from './pages/Checkout';
import NotFoundPage from './routes/not-found';
import RequireAuth from './routes/requireAuth';
import PersistLogin from './routes/persistLogin';

export default function App() {
  const { i18n } = useTranslation();
  const id = useId();
  console.log('app run');
  console.log('useId', id);
  document.body.dir = i18n.dir();
  document.documentElement.lang = i18n.language;

  const router = createBrowserRouter([
    {
      element: <PersistLogin />,
      children: [
        {
          path: '/',
          element: <AppLayout />,
          children: [
            { index: true, element: <HomePage /> },
            { path: 'products', element: <ShoppingPage /> },
            { path: 'products/:productId', element: <ProductPage /> },
            { path: 'cart', element: <CartPage /> },
            { path: 'wishlist', element: <WishlistPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'sign-up', element: <SignUpPage /> },
            // Private Routes
            {
              element: <RequireAuth />,
              children: [{ path: 'checkout', element: <CheckoutPage /> }],
            },
            // Not Found Route
            {
              path: '*',
              element: <NotFoundPage />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route element={<PersistLogin />}>
    //       <Route path="/" element={<AppLayout />}>
    //         <Route index element={<HomePage />} />
    //         <Route path="products" element={<ShoppingPage />} />
    //         <Route path="products/:productId" element={<ProductPage />} />
    //         <Route path="cart" element={<CartPage />} />
    //         <Route path="wishlist" element={<WishlistPage />} />
    //         <Route path="login" element={<LoginPage />} />
    //         <Route path="sign-up" element={<SignUpPage />} />

    //         {/* private Routes */}
    //         <Route element={<RequireAuth />}>
    //           <Route path="checkout" element={<CheckoutPage />} />
    //         </Route>
    //       </Route>
    //     </Route>

    //     <Route path="/*" element={<NotFoundPage />} />
    //   </Routes>
    // </BrowserRouter>
    <RouterProvider router={router} />
  );
}
