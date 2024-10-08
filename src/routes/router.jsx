import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import {
  Catalog,
  Comparison,
  Favorites,
  Home,
  Profile,
  ShoppingCart,
  ProductPage,
  ReviewsPage,
  SearchResults,
  CartCheckout,
  PaymentDelivery,
  Warranty,
  Wholesale,
  Contacts,
  About,
  FAQ,
  PageNotFound
} from '../pages';

import {
  CatProducts,
  ChangePassword,
  Layout,
  MyOrders,
  Organizations,
  PersonalData,
} from '../components';

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { getTokenFromCookies } from '../helpers/cookies/cookies';

const fetchProduct = async ({ params }) => {
  let group = await fetch(
    `https://rosstok.ru/api/Products/item?id=${params.productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getTokenFromCookies()}`
      },
    }
  );
  
  return group;
};

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
          <Route index element={<Catalog />} />
          <Route path=':categoryId'>
            <Route index element={<CatProducts />} />
            <Route path=':productId'>
              <Route index element={<ProductPage />} loader={fetchProduct} />
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
