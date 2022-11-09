import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import Loading from '@/components/Loading';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
import { setLocale, getLocale } from 'umi';
import { getCurrentUser } from './services/UserService/customers';
import { getUserInfo, setUserInfo, getAppToken, removeAppToken } from './utils/utils';
import { remove } from 'lodash';
import { message } from 'antd';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

import { MessengerChat } from 'react-messenger-chat-plugin';

export const initialStateConfig = {
  loading: false,
};

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const token = getAppToken();
      if (token) {
        // const msg = await getCurrentUser();
        // Không có api get current user nên set cứng, thêm các field cần thiết sau
        const msg = { role: { name: 'admin test' } };
        setUserInfo(msg);
        access = msg.role.name;
        if (msg) {
          return msg;
        }
      }
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  };

  const currentUser = await fetchUserInfo();

  return {
    fetchUserInfo,
    currentUser,
    settings: defaultSettings,
  };
}

export const layout = ({ initialState, setInitialState }) => {
  // Mac dinh phai set ngon ngu trong app vi config bi loi
  setLocale('vi-VN');

  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;

      if (initialState?.currentUser && location.pathname == loginPath) {
        history.push('/dashboard');
      }

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        message.error('Chưa đăng nhập. Vui lòng đăng nhập để tiếp tục');
        history.push(loginPath);
      }
    },

    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )}
          <MessengerChat
            pageId="110220568567445"
            language="vi_VN"
            themeColor={'#000000'}
            bottomSpacing={300}
            loggedInGreeting="loggedInGreeting"
            loggedOutGreeting="loggedOutGreeting"
            greetingDialogDisplay={'show'}
            debugMode={true}
            onMessengerShow={() => {
              console.log('onMessengerShow');
            }}
            onMessengerHide={() => {
              console.log('onMessengerHide');
            }}
            onMessengerDialogShow={() => {
              console.log('onMessengerDialogShow');
            }}
            onMessengerDialogHide={() => {
              console.log('onMessengerDialogHide');
            }}
            onMessengerMounted={() => {
              console.log('onMessengerMounted');
            }}
            onMessengerLoad={() => {
              console.log('onMessengerLoad');
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};
