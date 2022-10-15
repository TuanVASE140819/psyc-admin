// https://umijs.org/config/
import { defineConfig } from 'umi';
import { LogoutOutlined } from '@ant-design/icons';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN

    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/Loading',
  },
  define: {
    API_BATCH_URL: REACT_APP_ENV == 'dev' ? 'https://20.124.25.10' : 'https://20.124.25.10',
    API_URL: REACT_APP_ENV == 'dev' ? 'https://20.124.25.10' : 'https://stg-api.tranastro.com',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user',

          routes: [
            {
              name: 'login',
              path: '/user/login',
              component: './user/Login',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'Bảng Điều Khiển',
      icon: 'dashboard',
      access: 'admin',
      component: './dashboard',
    },
    {
      path: '/users',
      name: 'Người dùng',
      icon: 'user',
      routes: [
        {
          path: '/users',
          redirect: '/users/category',
        },
        {
          path: '/users/specialize',
          name: 'Chuyên môn',
          // icon: 'smile',
          access: 'admin',
          component: './shop/category',
        },
        {
          path: '/users/customers',
          name: 'Khách hàng',
          icon: 'user-add',
          access: 'admin',
          component: './shop/users',
        },
        {
          path: '/users/consutanlts',
          name: 'Tư vấn viên',
          // icon: 'smile',
          access: 'admin',
          component: './shop/users-consutanlts',
        },
        // {
        //   path: '/users/productmaster',
        //   name: 'Product',
        //   access: 'admin',
        //   component: './shop/productmaster',
        // },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/data',
      name: 'Dữ liệu',
      icon: 'database',
      access: 'admin',
      routes: [
        {
          path: '/data',
          redirect: '/data/news',
        },
        {
          path: '/data/news',
          name: 'Bài viết',
          access: 'admin',
          component: './data/news',
        },
        // {
        //   path: '/data/quote',
        //   name: 'Quote',
        //   access: 'admin',
        //   component: './data/quote',
        // },
        // {
        //   path: '/data/horoscopeitem',
        //   name: 'HoroscopeItem',
        //   access: 'admin',
        //   component: './data/horoscopeitem',
        // }
      ],
    },
    {
      path: '/astrology',
      name: 'Chiêm tinh học',
      icon: 'snippets',
      access: 'admin',
      routes: [
        {
          path: '/astrology',
          redirect: '/astrology/zodiac',
        },
        {
          path: '/astrology/zodiac',
          name: 'Cung hoàng đạo',
          access: 'admin',
          component: './astrology/zodiac',
        },
        {
          path: '/astrology/house',
          name: 'Nhà',
          access: 'admin',
          component: './astrology/house',
        },

        {
          path: '/astrology/planet',
          name: 'Hành tinh',
          access: 'admin',
          component: './astrology/planet',
        },
        {
          path: '/astrology/planet/:planetId',
          name: 'Chi tiết hành tinh',
          hideInMenu: true,
          access: 'admin',
          component: './astrology/planet/[planetId]',
        },
        {
          path: '/astrology/zodiac/:zodiacId',
          name: 'Detail Zodiac',
          hideInMenu: true,
          access: 'admin',
          component: './astrology/zodiac/[zodiacId]',
        },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      component: './404',
    },
  ],
  theme: {
    'root-entry-name': 'variable',
  },
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  fastRefresh: {},
  nodeModulesTransform: {
    type: 'none',
  },
});
