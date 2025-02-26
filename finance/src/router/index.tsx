import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { appComponentsRoute, authRoutes, dashboardRoutes } from './routes';

const generateRoutes = (routes: any[]) =>
  routes.map(({ path, element, children }) => (
    <Route key={path} path={path} element={element}>
      {children && generateRoutes(children)}
    </Route>
  ));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {generateRoutes(authRoutes)}
      {generateRoutes(dashboardRoutes)}
      {generateRoutes(appComponentsRoute)}
    </>,
  ),
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
