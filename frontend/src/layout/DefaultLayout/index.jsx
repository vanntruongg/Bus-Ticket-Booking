import { Suspense, lazy } from 'react';

import { USER_STYLE } from '@/constants/styleContant';
export const Header = lazy(() => import('../Header'));
export const Footer = lazy(() => import('../Footer'));

import BgImage from '@/assets/bg9.png';

const DefaultLayout = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
      className="h-[400px] bg-no-repeat bg-cover "
    >
      <header className="">
        <Suspense fallback={<div className=""></div>}>
          <Header />
        </Suspense>
        {/* <div className="mx-48 border-b">
          <Nav />
        </div> */}
      </header>
      <main
        style={{ paddingTop: USER_STYLE.HEIGTH_HEADER + 'px' }}
        className="max-w-[1360px] mx-auto"
      >
        {children}
      </main>
      <div className=""></div>
      <Suspense fallback={<div className=""></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};
export default DefaultLayout;
