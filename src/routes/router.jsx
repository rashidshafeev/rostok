import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Comparison, Favorites, Home, Profile, ShoppingCart } from '../pages';
import { Layout } from '../components';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='shopping-cart' element={<ShoppingCart />} />
        <Route path='favorites' element={<Favorites />} />
        <Route path='comparison' element={<Comparison />} />
        <Route path='/profile'>
          <Route index element={<Profile />} />
        </Route>
      </Route>
    </Route>
  )
);
