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
  CartCheckout
} from '../pages';

import {
  CatProducts,
  ChangePassword,
  Layout,
  MyOrders,
  Organizations,
  PersonalData,
} from '../components';

const fetchProduct = async ({ params }) => {
  let group = await fetch(
    `https://bot-adash.host2bot.ru/api/Products/item?id=${params.productId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
        <Route path='profile' element={<Profile />}>
          <Route path='personal-data' element={<PersonalData />} />
          <Route path='organizations' element={<Organizations />} />
          <Route path='change-password' element={<ChangePassword />} />
          <Route path='orders' element={<MyOrders />} />
        </Route>
      </Route>
    </Route>
  )
);
