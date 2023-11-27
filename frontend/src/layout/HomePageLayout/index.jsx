import Header from '../Header';
import Nav from '../Nav';

const HomePageLayout = ({ children }) => {
  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] h-screen bg-no-repeat bg-cover">
      <header className="">
        <Header />
        <div className="max-w-[1360px] lg:mx-48 2xl:mx-auto border-b z-20">
          <Nav />
        </div>
      </header>
      <main className="px-16 mt-6 max-w-[1360px] mx-auto">{children}</main>
    </div>
  );
};

export default HomePageLayout;
