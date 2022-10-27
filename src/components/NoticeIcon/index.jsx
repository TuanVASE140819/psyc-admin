import { useEffect, useState } from 'react';
import { Tag, message } from 'antd';
import { groupBy } from 'lodash';
import moment from 'moment';
import { useModel, useRequest } from 'umi';
import { getNotices, seenNoti } from '@/services/ant-design-pro/api';
import NoticeIcon from './NoticeIcon';
import styles from './index.less';
import 'moment/locale/vi';

const getNoticeData = (notices) => {
  // list notification with status "seen"
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {};
  }

  const newNotices = notices.map((notice) => {
    const newNotice = { ...notice };

    if (newNotice.dateCreate) {
      // lang: 'vn-VN' UTC +7
      newNotice.dateCreate = moment(notice.dateCreate).locale('vi').fromNow();
    }

    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }
    return newNotice;
  });
  return groupBy(newNotices, 'type');
};

const getUnreadData = (noticeData) => {
  const unreadMsg = {};
  Object.entries(noticeData).forEach(([key, value]) => {
    if (!unreadMsg[key]) {
      unreadMsg[key] = 0;
    }
    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter((item) => !item.read && item.status === 'notseen').length;
    }
  });
  return unreadMsg;
};
//loop set timeout for notification

const NoticeIconView = () => {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [notices, setNotices] = useState([]);
  const { data } = useRequest(getNotices);
  useEffect(() => {
    setNotices(data || []);
  }, [data]);
  const noticeData = getNoticeData(notices);
  const unreadMsg = getUnreadData(noticeData || {});

  const changeReadState = (id) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };

        if (notice.id === id) {
          notice.read = true;
        }

        return notice;
      }),
    );
  };

  const clearReadState = (title, key) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };

        if (notice.type === key) {
          notice.read = true;
        }

        return notice;
      }),
    );
    message.success(`${title} cleared!`);
  };

  return (
    <>
      <NoticeIcon
        className={styles.action}
        // set timeout 1000 s for variable coun
        count={unreadMsg && Object.keys(unreadMsg).reduce((pre, key) => pre + unreadMsg[key], 0)}
        onItemClick={(item) => {
          changeReadState(item.id);
        }}
        onClear={(title, key) => clearReadState(title, key)}
        loading={false}
        clearText="Clear"
        viewMoreText="Xem thêm"
        onViewMore={() => message.info('Click on view more')}
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="message"
          color="#108ee9"
          count={unreadMsg.deposit}
          list={noticeData.deposit}
          title="Nạp tiền"
          emptyText="您已读完所有消息"
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="event"
          title="Rút tiền"
          emptyText="你已完成所有待办"
          count={unreadMsg.null}
          list={noticeData.null}
          showViewMore
        />
      </NoticeIcon>
    </>
  );
};

export default NoticeIconView;
