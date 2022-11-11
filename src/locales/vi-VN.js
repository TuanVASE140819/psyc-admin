import component from './vi-VN/component';
import globalHeader from './vi-VN/globalHeader';
import menu from './vi-VN/menu';
import pages from './vi-VN/pages';
import pwa from './vi-VN/pwa';
import settingDrawer from './vi-VN/settingDrawer';
import settings from './vi-VN/settings';
export default {
  'navBar.lang': 'Ngôn ngữ',
  'layout.user.link.help': 'Trợ giúp',
  'layout.user.link.privacy': 'Riêng tư',
  'layout.user.link.terms': 'Điều khoản',
  'app.copyright.produced': 'Produced by PSYC TEAM',
  'app.preview.down.block': 'Tải về toàn bộ code của trang này',
  'app.welcome.link.fetch-blocks': 'Tải về toàn bộ code của trang này',
  'app.welcome.link.block-list': 'Tải về toàn bộ code của trang này',
  tableForm: {
    search: 'Tìm kiếm',
    reset: 'Đặt lại',
    submit: 'Gửi đi',
    collapsed: 'Mở rộng',
    expand: 'Thu gọn',
    inputPlaceholder: 'Nhập từ khóa',
    selectPlaceholder: 'Hãy chọn một tùy chọn',
  },
  Modal: {
    okText: 'Đồng ý',
    cancelText: 'Hủy bỏ',
    justOkText: 'Đồng ý',
  },
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
};
