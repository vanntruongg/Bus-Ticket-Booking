import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { PersistGate } from 'redux-persist/integration/react';

import vi_VN from 'antd/locale/vi_VN';
import 'dayjs/locale/vi.js';
import dayjs from 'dayjs';
dayjs.locale('vi');

import { store, persistor } from './redux/store.js';
import ScrollToTop from './components/ScrollToTop/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00a48f',
        colorPrimaryBg: '#00a48f',
        colorPrimaryBgHover: '#00a48f',
        colorErrorOutline: 'rgba(0, 197, 167, 0.2',
      },
      components: {
        Menu: {
          darkItemColor: '#fff',
          darkItemSelectedBg: '#fff',
          darkItemSelectedColor: '#1c495e',
          darkSubMenuItemBg: '#00a48f',
          darkItemHoverColor: '#1c495e',
        },
        Button: {
          defaultBg: '#00a48f',
        },
      },
    }}
    locale={vi_VN}
  >
    <Router restoreScroll={true}>
      <ScrollToTop />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Router>
  </ConfigProvider>,
  // </React.StrictMode>,
);
