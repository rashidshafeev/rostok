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
  ReviewsPage
} from '../pages';
import {
  CatItem,
  ChangePassword,
  Layout,
  MyOrders,
  Organizations,
  PersonalData,
  Products,
} from '../components';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='shopping-cart' element={<ShoppingCart />} />
        <Route path='favorites' element={<Favorites />} />
        <Route path='comparison' element={<Comparison />} />
        <Route path='catalog' >
          <Route index element={<Catalog />} />
          <Route path=':categoryId'>
            <Route index element={<CatItem />} />
              {/* <Route path='products' element={<Products />} /> */}
              <Route path=':productId' element={<ProductPage />} />
              <Route path=':productId/review' element={<ReviewsPage />} />
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
