import { Suspense, lazy } from 'react';

import { USER_STYLE } from '@/constants/styleContant';
export const Header = lazy(() => import('../Header'));
import BgImage from '@/assets/bg9.png';

const AuthLayout = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
      className=" h-screen bg-no-repeat bg-cover"
    >
      <div className="backdrop-blur-md h-screen">
        <header className="">
          <Suspense fallback={<></>}>
            <Header />
          </Suspense>
        </header>
        <main
          style={{ paddingTop: USER_STYLE.HEIGTH_HEADER + 'px' }}
          className="px-16 flex justify-center"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
