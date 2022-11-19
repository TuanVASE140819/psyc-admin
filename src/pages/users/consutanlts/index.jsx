import { EditOutlined } from '@ant-design/icons';
import { Button, message, Space, Tag, Rate } from 'antd';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ModalForm from '@/components/ModalForm';
import { getConsutanlts, getAConsutanlt, editConsutanlt } from '@/services/UserService/consutanlts';
import { useModel } from 'umi';
import { uploadFile } from '@/utils/uploadFile';
import Profile from './component/Profile';

const User = () => {
  //config column
  const column = [
    {
      title: 'No.',
      dataIndex: 'number',

      sorter: (a, b) => a.number - b.number,
      search: false,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      copyable: true,
      valueType: 'fullname',
      sorter: (a, b) => a.fullName.length - b.fullName.length,
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
      search: false,
      copyable: true,
      valueType: 'phoneNumber',
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
      title: 'Xếp hạng',
      search: false,
      dataIndex: 'rating',
      valueType: 'select',
      // use Rate
      render: (_, record) => {
        return <Rate allowHalf defaultValue={record.rating} />;
      },
    },
    {
      title: 'Trạng thái',
      search: false,
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
      title: 'Thao tác',
      dataIndex: 'action',
      search: false,
      render: (_, record) => {
        return (
          <div>
            <div>
              <Button
                key="editConsutanlt"
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
      name: 'Quay lại',
      loading: false,
    },
    {
      key: 'submitAddUser',
      type: 'primary',
      click: 'submit',
      name: 'Lưu',
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
    },
    {
      fieldType: 'formText',
      key: 'fieldAddPhoneNumberUser',
      label: 'Phone Number',
      width: 'lg',
      placeholder: 'Enter phone number',
      name: 'phoneNumber',
      requiredField: 'true',
    },
    {
      fieldType: 'formInputFileImg',
      key: 'fieldGetImgLink',
      label: 'Ảnh đại diện',
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
      placeholder: 'Nhập tên người dùng',
      name: 'fullName',
      value: 'fullname',
      requiredField: 'true',
      ruleMessage: 'Nhập tên người dùng',
    },
    {
      fieldType: 'formText',
      key: 'fieldAddPhoneNumberUser',
      label: 'Gmail',
      width: 'lg',
      placeholder: 'NHập gmail',
      name: 'email',
      readOnly: 'true',
      disabled: 'true',
      value: '',
      requiredField: 'true',
      ruleMessage: 'Nhập gmail',
      hidden: true,
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
      placeholder: 'Chọn trạng thái',
      requiredField: 'true',
      ruleMessage: 'Chọn trạng thái',
    },
    {
      fieldType: 'formInputFileImg',
      key: 'fieldGetImgLink',
      label: 'Ảnh đại diện',
      width: 'lg',
      placeholder: 'Avatar Link',
      name: 'imageUrl',
      nameUpload: 'avatarUser',
      nameInputFile: 'avatarFileToFirebase',
      readOnly: 'true',
      requiredField: 'true',
      ruleMessage: 'Tải ảnh lên trước khi submit',
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
      message.loading('Đang tải ...', 9999);
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

    await editConsutanlt({ ...values, id: userRecord.id });
    setShowModel(false);

    actionRef?.current?.reload();
    // setButtonLoading(false);
  };

  const handleEditUserForm = async (record) => {
    const userId = record?.id;
    setButtonEditLoading(true);
    const user = await getAConsutanlt(userId);
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
          request={async (params, sort, filter) => {
            const data = [];
            await getConsutanlts(params.fullname ?? '').then((res) => {
              console.log('res at table query', res);
              res?.data?.map((item, index) => {
                item.number = index + 1;
                data[index] = item;
              });
              setTotal(res?.total);
            });
            // }

            return {
              data: data,
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
              setPage(page);
              setPageSize(pageSize);
            },
          }}
          search={{
            labelWidth: 'auto',
            searchText: 'Tìm kiếm',
            submittext: 'Submit',
            resetText: 'Reset',
          }}
        />
      </PageContainer>
      {flagEditForm === 'edit' ? (
        <ModalForm
          showModal={showModal}
          titleModal={`Edit ${userRecord.fullName}`}
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
