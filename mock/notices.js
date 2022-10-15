const getNotices = (req, res) => {
  res.json({
    data: [
      {
        id: "000000004",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
        title: "Vũ Anh Tuấn đặt lịch thành công",
        datetime: "2022-10-16",
        type: "booked"
      },
      {
        id: "000000001",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
        title: "Vũ Anh Tuấn đặt lịch thành công",
        datetime: "2017-08-08",
        type: "booked"
      },
      {
        id: "000000002",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
        title: "Vũ Anh Tuấn đặt lịch thành công",
        datetime: "2017-08-08",
        type: "booked"
      },
      {
        id: "000000003",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
        title: "Vũ Anh Tuấn đặt lịch thành công",
        datetime: "2017-08-08",
        type: "booked"
      },
    
      {
        id: "000000005",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
        title: "Lun Lun đã nạp thành công 300 cua",
        datetime: "2022-08-07",
        type: "recharge"
      },
      {
        id: "000000006",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
        title: "Lun Lun đã nạp thành công 300 cua",
        datetime: "2022-08-07",
        type: "recharge"
      },
      {
        id: "000000007",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
        title: "Lun Lun đã nạp thành công 300 cua",
        datetime: "2022-08-07",
        type: "recharge"
      },
      {
        id: "000000008",
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
        title: "Lun Lun đã nạp thành công 300 cua",
        datetime: "2017-08-07",
        type: "recharge"
      },
      {
        id: "000000009",
        title: "CG:Tasbisan Rút 200.000 về tài khoản ngân hàng",
        description: "2022-01-12 20:00",
        extra: "Đang chờ",
        status: "todo",
        type: "withdraw"
      },
      {
        id: "000000010",
        title: "CG:Tasbisan Rút 200.000 về tài khoản ?",
        description: "2022-01-12 20:00",
        extra: "Đã từ chối",
        status: "urgent",
        type: "withdraw"
      },
      {
        id: "000000011",
        title: "CG:Tasbisan Rút 200.000 về tài khoản",
        description: "2022-01-12 20:00",
        extra: "Thành công",
        status: "doing",
        type: "withdraw"
      }
    ],
  });
};

export default {
  'GET /api/notices': getNotices,
};
