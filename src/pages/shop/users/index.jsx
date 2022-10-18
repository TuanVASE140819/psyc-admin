import { EditOutlined } from '@ant-design/icons';
import { Button, message, Space, Tag } from 'antd';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import ModalForm from '@/components/ModalForm';
import { getAnUser, getUsers } from '@/services/ant-design-pro/user';
import { addUser } from '@/services/ant-design-pro/user';
import { editUser } from '@/services/ant-design-pro/user';
import { useModel } from 'umi';
import { uploadFile } from '@/utils/uploadFile';
import Profile from './component/Profile';
import dayjs from 'dayjs';

const User = () => {
  //config column
  const column = [
    {
      title: 'STT',
      dataIndex: 'number',
      sorter: (a, b) => a.number - b.number,
      search: false,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
      copyable: true,
      valueType: 'fullname',
      sorter: (a, b) => a.fullname.length - b.fullname.length,
      filters: true,
      onFilter: true,
      formItemProps: {
        rules: [
          {
            require: true,
            message: 'Enter username to search',
          },
        ],
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      copyable: true,
      valueType: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      filters: true,
      onFilter: true,
      formItemProps: {
        rules: [
          {
            require: true,
            message: 'Enter phone number to search',
          },
        ],
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        null: { text: 'Đang chờ', status: 'Default' },
        active: { text: 'Hoạt động', status: 'Success' },
        inactive: { text: 'Ngừng hoạt động', status: 'Error' },
      },
      width: '20%',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      search: false,
      render: (_, record) => {
        return (
          <div>
            <div>
              <Button
                key="editUser"
                type="primary"
                size="middle"
                icon={<EditOutlined />}
                block={true}
                onClick={() => handleEditUserForm(record)}
              >
                Chi tiết
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const buttonSubmitter = [
    {
      key: 'clearFieldFormUser',
      type: 'default',
      click: 'reset',
      name: 'Làm mới',
      loading: false,
    },
    {
      key: 'submitAddUser',
      type: 'primary',
      click: 'submit',
      name: 'Thay đổi',
      loading: false,
    },
  ];

  const formFieldAdd = [
    {
      fieldType: 'formText',
      key: 'fieldAddUsername',
      label: 'Họ và tên',
      width: 'lg',
      placeholder: 'Nhập tên người dùng',
      name: 'username',
      requiredField: 'true',
      ruleMessage: 'Input username before submit',
    },
    {
      fieldType: 'formText',
      key: 'fieldAddPhoneNumberUser',
      label: 'Phone Number',
      width: 'lg',
      placeholder: 'Enter phone number',
      name: 'phoneNumber',
      requiredField: 'true',
      ruleMessage: 'Input phone number before submit',
    },
    {
      fieldType: 'formInputFileImg',
      key: 'fieldGetImgLink',
      label: 'Avatar',
      width: 'lg',
      placeholder: 'Avatar Link',
      name: 'avatarLink',
      nameUpload: 'avatarUser',
      nameInputFile: 'avatarFileToFirebase',
      readOnly: 'true',
      // requiredField: 'true',
      ruleMessage: 'Upload image before submit',
    },
  ];

  const formFieldEdit = [
    {
      fieldType: 'formText',
      key: 'fieldAddUsername',
      label: 'Họ và tên',
      width: 'lg',
      placeholder: 'Enter username ',
      name: 'fullname',
      value: 'fullname',
      requiredField: 'true',
      ruleMessage: 'Input username before submit',
    },
    {
      fieldType: 'formText',
      key: 'fieldAddPhoneNumberUser',
      label: 'Gmail',
      width: 'lg',
      placeholder: 'Enter phone number',
      name: 'email',
      readOnly: 'true',
      disabled: 'true',
      value: '',
      requiredField: 'true',
      ruleMessage: 'Input gmail before submit',
      hidden: true,
    },
    {
      fieldType: 'formText',
      key: 'fieldAddAddressUser',
      label: 'Dia chỉ',
      width: 'lg',
      placeholder: 'Địa chỉ',
      name: 'address',
      value: '',
    },
    {
      fieldType: 'formSelect',
      key: 'selectGenderUser',
      name: 'gender',
      label: 'Giới tính',
      defaultValue: 1,
      valueEnum: [
        {
          valueName: 'Male',
          valueDisplay: 'Nam',
        },
        {
          valueName: 'Female',
          valueDisplay: 'Nữ',
        },
        {
          valueName: 'Other',
          valueDisplay: 'Khác',
        },
      ],
      placeholder: 'Chọn giới tính',
      requiredField: 'true',
      ruleMessage: 'Chọn giới tính',
      allowClear: false,
    },
    {
      fieldType: 'datePicker',
      key: 'fieldEditBirthDate',
      label: 'Ngày và giờ sinh',
      width: 'lg',
      placeholder: 'Chọn ngày và giờ sinh',
      name: 'dob',
      requiredField: 'true',
      ruleMessage: 'Nhập ngày và giờ sinh',
    },
    {
      fieldType: 'formSelect',
      key: 'selectStatusUser',
      name: 'status',
      label: 'Trạng thái',
      defaultValue: 1,
      valueEnum: [
        {
          valueName: 'active',
          valueDisplay: 'Hoạt động',
        },
        {
          valueName: 'inactive',
          valueDisplay: 'Khóa',
        },
      ],
      placeholder: 'Please select status',
      requiredField: 'true',
      ruleMessage: 'Please select user status',
      allowClear: false,
    },
    {
      fieldType: 'formInputFileImg',
      key: 'fieldGetImgLink',
      label: 'Avatar',
      width: 'lg',
      placeholder: 'Avatar Link',
      name: 'imageUrl',
      nameUpload: 'avatarUser',
      nameInputFile: 'avatarFileToFirebase',
      readOnly: 'true',
      requiredField: 'true',
      ruleMessage: 'Upload image before submit',
    },
    // {
    //   fieldType: 'checkEdit',
    //   name: 'edit',
    //   value: 'edit',
    // },
  ];

  const actionRef = React.useRef();
  const formUserRef = React.useRef();
  const [showModal, setShowModel] = React.useState(false);
  //state cua upload img len Firebase
  const [imgLinkFirebase, setImgLinkFirebase] = React.useState(null);
  const [loadingUploadImgFirebase, setLoadingUploadingImgFirebase] = React.useState(false);

  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [userRecord, setUserRecord] = React.useState(null);
  const [flagEditForm, setFlagEditForm] = React.useState('');
  const [buttonSubmitterUser, setButtonSubmitterUser] = React.useState(buttonSubmitter);
  const [formFieldAddUser, setFormFieldAddUser] = React.useState(formFieldAdd);
  const [formFieldEditUser, setFormFieldEditUser] = React.useState(formFieldEdit);
  const { initialState, setInitialState } = useModel('@@initialState');

  //paging
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(8);
  const [total, setTotal] = React.useState(10);
  //button edit loading
  const [buttonEditLoading, setButtonEditLoading] = React.useState(false);

  React.useEffect(() => {
    if (loadingUploadImgFirebase) {
      message.loading('Uploading', 9999);
    } else {
      message.destroy();
    }
    return () => {
      message.destroy();
    };
  }, [loadingUploadImgFirebase]);

  React.useEffect(() => {
    if (buttonEditLoading) {
      message.loading('Đang tải...', 9999);
    } else {
      message.destroy();
    }
    return () => {
      message.destroy();
    };
  }, [buttonEditLoading]);

  React.useEffect(() => {
    const newButtonSubmitUser = buttonSubmitterUser.map((item) => {
      if (item.name === 'Submit') {
        item.loading = buttonLoading;
      }
      return item;
    });
    setButtonSubmitterUser(newButtonSubmitUser);
  }, [buttonLoading]);

  // React.useEffect(() => {
  //   if (userRecord) {
  //     const newFormFieldEditUser = formFieldEditUser.map((item, index) => {
  //       if (item.name === 'userName') {
  //         item.value = userRecord.userName;
  //       } else if (item?.name === 'phoneNumber') {
  //         item.value = userRecord.phoneNumber;
  //       }
  //       return item;
  //     });
  //     setFormFieldEditUser(newFormFieldEditUser);
  //     //Vì modal form khi hủy modal giá trị initial value vẫn ko đổi nên ta
  //     //phải dùng setFieldvalue để set value cho các field
  //     formUserRef?.current?.setFieldsValue(userRecord);
  //   }
  // }, [userRecord]);

  //customupload img
  const customUpload = async ({ onError, onSuccess, file }) => {
    const isImage = file.type.indexOf('image/') === 0;
    if (!isImage) {
      setLoadingUploadingImgFirebase(false);
      message.destroy();
      message.error('Bạn chỉ có thể tải lên tệp IMAGE!');
      return isImage;
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error('Hình ảnh phải nhỏ hơn 4MB!');
      return isLt4M;
    }
    try {
      setLoadingUploadingImgFirebase(true);
      const imgLink = await uploadFile(file, 'useravatar');

      if (imgLink) {
        setImgLinkFirebase(imgLink);
        formUserRef?.current?.setFieldsValue({
          ['imageUrl']: imgLink,
        });
        setLoadingUploadingImgFirebase(false);
        message.success('Tải lên hình ảnh thành công!');
      }
    } catch (error) {
      onError(error);
    } finally {
      setLoadingUploadingImgFirebase(false);
    }
  };

  const handleModal = () => {
    setShowModel(!showModal);
    setFlagEditForm('');
    //vì hàm này ko liên quan đến edit user nên phải set lại user record = null
    setUserRecord(null);
  };

  const handleCancelModel = () => {
    setShowModel(false);
    setButtonLoading(false);
    setFlagEditForm('');
    // hàm này tắt modal nên cũng phải set lại edit user
    setImgLinkFirebase(null);
    setUserRecord(null);
    if (formUserRef) {
      formUserRef?.current?.resetFields();
    }
  };

  const handleResetForm = () => {
    formUserRef?.current?.resetFields();
    setImgLinkFirebase(null);
    setLoadingUploadingImgFirebase(false);
  };

  const handleSubmitFormUser = async (values) => {
    console.log('values', values);
    // setButtonLoading(true);
    // if (values.edit) {
    //   // sử lí edit user
    //   const newValues = Object.assign({}, values);
    //   const attr = 'edit';
    //   const dataEdit = Object.keys(newValues).reduce((item, key) => {
    //     if (key !== attr) {
    //       item[key] = newValues[key];
    //     }
    //     return item;
    //   }, {});
    //   dataEdit.id = userRecord.id;
    // TODO:
    const tempDOB = dayjs(values.dob).format('YYYY-MM-DD');
    await editUser({ ...values, id: userRecord.id, dob: tempDOB });
    setShowModel(false);
    // } else {
    //   // sử lí add user bình thường
    //   await addUser(values);
    // }

    actionRef?.current?.reload();
    // setButtonLoading(false);
  };

  const handleEditUserForm = async (record) => {
    const userId = record?.id;
    setButtonEditLoading(true);
    const user = await getAnUser(userId);
    if (user) {
      setUserRecord(user);
      setFlagEditForm('edit');
      setShowModel(!showModal);
      setImgLinkFirebase(user.imageUrl);
      formUserRef?.current?.setFieldsValue(user);
    }
    setButtonEditLoading(false);
  };

  const expandedRowRender = (record) => {
    return <Profile user={record} />;
  };
  return (
    <>
      <PageContainer>
        <ProTable
          columns={column}
          rowKey={(record) => record.id}
          expandable={{
            expandedRowRender,
          }}
          request={async (params, sort, filter) => {
            // const currentAttr = 'current';
            // const pageSizeAttr = 'pageSize';
            const data = [];
            // console.log(params);
            // if (params.userName || params.phoneNumber || params.status) {
            //   console.log('A');
            //   const newParams = Object.keys(params).reduce((item, key) => {
            //     if (key != currentAttr && key != pageSizeAttr) {
            //       if (key === 'userName') {
            //         item.name = params[key];
            //       } else if (key === 'phoneNumber') {
            //         item.phone = params[key];
            //       } else if (key === 'status') {
            //         if (params[key].toString().toLowerCase() === 'active') {
            //           item.status = 1;
            //         } else if (params[key].toString().toLowerCase() === 'unactive') {
            //           item.status = 0;
            //         }
            //       } else {
            //         item[key] = params[key];
            //       }
            //     }
            //     return item;
            //   }, {});
            //   console.log('params', newParams);
            //   await getUsers(newParams).then((res) => {
            //     console.log('res at table query', res);
            //     res?.payload?.map((item, index) => {
            //       item.number = index + 1;
            //       data[index] = item;
            //     });
            //     setTotal(res?.total);
            //   });
            // } else {
            //   console.log('B');
            const arr = await getUsers(params.fullname ?? '');
            setTotal(arr.length);
            return {
              data: arr.map((item, index) => ({ ...item, number: index + 1 })),
              success: true,
            };
          }}
          onReset={true}
          actionRef={actionRef}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: total,
            onchange: (page, pageSize) => {
              console.log('on change', page, pageSize);
              setPage(page);
              setPageSize(pageSize);
            },
          }}
          search={{
            labelWidth: 'auto',
            searchText: 'Tìm kiếm',
            submittext: 'Submit',
            resetText: 'Quay lại',
          }}
          // toolBarRender={(action) => [
          //   <Button
          //     size="middle"
          //     key="buttonAddUser"
          //     type="primary"
          //     icon={<PlusOutlined />}
          //     onClick={() => handleModal()}
          //   >
          //     Add
          //   </Button>,
          // ]}
        />
      </PageContainer>
      {flagEditForm === 'edit' ? (
        <ModalForm
          showModal={showModal}
          titleModal={`Chỉnh sửa ${userRecord.fullname}`}
          handleCancelModel={handleCancelModel}
          formRef={formUserRef}
          buttonSubmitter={buttonSubmitterUser}
          handleSubmitForm={handleSubmitFormUser}
          formField={formFieldEditUser}
          customUpload={customUpload}
          imgLinkFirebase={imgLinkFirebase}
          handleResetForm={handleResetForm}
        />
      ) : (
        <ModalForm
          showModal={showModal}
          titleModal="Add New User"
          handleCancelModel={handleCancelModel}
          formRef={formUserRef}
          buttonSubmitter={buttonSubmitterUser}
          handleSubmitForm={handleSubmitFormUser}
          formField={formFieldAddUser}
          customUpload={customUpload}
          imgLinkFirebase={imgLinkFirebase}
          handleResetForm={handleResetForm}
        />
      )}
    </>
  );
};

export default React.memo(User);
