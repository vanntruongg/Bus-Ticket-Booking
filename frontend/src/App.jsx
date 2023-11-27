import { Route, Routes } from 'react-router-dom';
import {
  adminRoutes,
  employeeRoutes,
  privateRoutes,
  publicRoutes,
} from './routes';
import DefaultLayoutClient from './layout/DefaultLayout';
import DefaultLayoutAdmin from './layout/LayoutAdmin/DefaultLayout';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import NotFound from './pages/NotFound';
import { Suspense } from 'react';
import { ThreeBodyLoading } from './components/Loading';
import SessionExpiredMessage from './components/SessionExpiredMessage';
import EmployeeRoute from './routes/EmployeeRoute';

function App() {
  return (
    <div className="">
      <SessionExpiredMessage />
      <div className="app">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout || DefaultLayoutClient;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Suspense fallback={<ThreeBodyLoading />}>
                      <Page />
                    </Suspense>
                  </Layout>
                }
              />
            );
          })}

          <Route element={<PrivateRoute />}>
            {privateRoutes.map((route, index) => {
              const Layout = route.layout || DefaultLayoutClient;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Suspense fallback={<ThreeBodyLoading />}>
                        <Page />
                      </Suspense>
                    </Layout>
                  }
                />
              );
            })}
          </Route>
          <Route element={<AdminRoute />}>
            {adminRoutes.map((route, index) => {
              const Layout = route.layout || DefaultLayoutAdmin;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Suspense fallback={<ThreeBodyLoading />}>
                        <Page />
                      </Suspense>
                    </Layout>
                  }
                />
              );
            })}
          </Route>

          <Route element={<EmployeeRoute />}>
            {employeeRoutes.map((route, index) => {
              const Layout = route.layout || DefaultLayoutAdmin;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Suspense fallback={<ThreeBodyLoading />}>
                        <Page />
                      </Suspense>
                    </Layout>
                  }
                />
              );
            })}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
