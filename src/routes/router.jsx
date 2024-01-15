import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Comparison, Favorites, Home, Profile, ShoppingCart } from '../pages';
import {
  ChangePassword,
  Layout,
  MyOrders,
  Organizations,
  PersonalData,
} from '../components';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='shopping-cart' element={<ShoppingCart />} />
        <Route path='favorites' element={<Favorites />} />
        <Route path='comparison' element={<Comparison />} />
        <Route path='/profile' element={<Profile />}>
          <Route path='personal-data' element={<PersonalData />} />
          <Route path='organizations' element={<Organizations />} />
          <Route path='change-password' element={<ChangePassword />} />
          <Route path='orders' element={<MyOrders />} />
        </Route>
      </Route>
    </Route>
  )
);
