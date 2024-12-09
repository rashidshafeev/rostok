import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Layout from '@components/Layout/Layout';

import Home from '@pages/Home/Home';

import CatalogPage from '@pages/CatalogPage/CatalogPage';
import Catalog from '@components/Catalog/Catalog';

import ShoppingCart from '@pages/ShoppingCart/ShoppingCart';
import Favorites from '@pages/Favorites/Favorites';
import Comparison from '@pages/Comparison/Comparison';
import ProductPage from '@pages/ProductPage/ProductPage';
import ReviewsPage from '@pages/Reviews/ReviewsPage';
import SearchResults from '@pages/SearchResults/SearchResults';
import CartCheckout from '@pages/Checkout/CartCheckout';
import PaymentDelivery from '@pages/PaymentDelivery/PaymentDelivery';
import Warranty from '@pages/Warranty/Warranty';
import Wholesale from '@pages/Wholesale/Wholesale';
import Contacts from '@pages/Contacts/Contacts';
import About from '@pages/About/About';
import FAQ from '@pages/FAQ/FAQ';
import PageNotFound from '@pages/PageNotFound/PageNotFound';

import ChangePassword from '@components/Profile/ChangePassword/ChangePassword';
import Profile from '@pages/Profile/Profile';

import MyOrders from '@components/Profile/MyOrders/MyOrders';
import Organizations from '@components/Profile/Organizations/Organizations';
import PersonalData from '@components/Profile/PersonalData/PersonalData';
import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='shopping-cart' element={<ShoppingCart />} />
        <Route path='checkout' element={<CartCheckout />} />
        <Route path='favorites' element={<Favorites />} />
        <Route path='comparison' element={<Comparison />} />
        <Route path='search-results' element={<SearchResults />} />
        <Route path='catalog'>
          <Route index element={<CatalogPage />} />
          <Route path=':categoryId'>
            <Route index element={<Catalog />} />
            <Route path=':productId'>
              <Route index element={<ProductPage />} />
              <Route path='reviews' element={<ReviewsPage />} />
            </Route>
          </Route>
        </Route>
        <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}>
          <Route path='personal-data' element={<PersonalData />} />
          <Route path='organizations' element={<Organizations />} />
          <Route path='change-password' element={<ChangePassword />} />
          <Route path='orders' element={<MyOrders />} />
        </Route>
        <Route path='payment-delivery' element={<PaymentDelivery />} />
        <Route path='warranty' element={<Warranty />} />
        <Route path='wholesale' element={<Wholesale  />}/>
        <Route path='contacts' element={<Contacts  />}/>
        <Route path='about' element={<About  />}/>
        <Route path='faq' element={<FAQ  />}/>
        <Route path='*' element={<PageNotFound  />}/>
      </Route>
    </Route>
  )
);