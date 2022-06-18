import { Route as RouteElement } from 'react-router';
import AuthGuard from './components/AuthGuard';
import React, { Suspense } from 'react';
import { Navigate, Routes } from 'react-router-dom';

type Route = {
  Component: React.LazyExoticComponent<() => JSX.Element>;
  path: string;
  isProtected: boolean;
};

const HomePage: React.LazyExoticComponent<() => JSX.Element> = React.lazy(
  () => import('./pages/HomePage')
);
const ProfilePage: React.LazyExoticComponent<() => JSX.Element> = React.lazy(
  () => import('./pages/ProfilePage')
);

const routes: Route[] = [
  {
    path: '/home',
    Component: HomePage,
    isProtected: true,
  },
  {
    path: '/profile/:id',
    Component: ProfilePage,
    isProtected: true,
  },
];

const RoutesLocal = () => {
  return (
    <>
      <Suspense fallback={<></>}>
        <Routes>
          {routes.map(({ path, isProtected, Component }: Route) => {
            return (
              <RouteElement
                key={path}
                path={path}
                element={
                  isProtected ? (
                    <AuthGuard>
                      <Component />
                    </AuthGuard>
                  ) : (
                    <Component />
                  )
                }
              />
            );
          })}
          <RouteElement path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default RoutesLocal;
