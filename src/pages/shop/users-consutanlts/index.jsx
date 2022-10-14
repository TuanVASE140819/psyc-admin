import { EditOutlined } from '@ant-design/icons';
import { Button, message, Space, Tag } from 'antd';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import ModalForm from '@/components/ModalForm';
import { getConsutanlts, getAConsutanlt } from '@/services/ant-design-pro/consutanlts';
import { editConsutanlt } from '@/services/ant-design-pro/consutanlts';
import { useModel } from 'umi';
import { getAnUser, getUsers } from '@/services/ant-design-pro/user';
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
      sorter: (a, b) => a.userName.localeCompare(b.userName),
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
      title: 'Số điện thoại',
      dataIndex: 'email',
      copyable: true,
      valueType: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
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
      title: 'trạng thái',
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
      title: 'Action',
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
                Edit
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
      name: 'Reset',
      loading: false,
    },
    {
      key: 'submitAddUser',
      type: 'primary',
      click: 'submit',
      name: 'Submit',
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
      name: 'fullName',
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
      message.error('You can only upload IMAGE file!');
      return isImage;
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error('Image must smaller than 4MB!');
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
        message.success('Upload Image Success!');
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
    await editConsutanlt({ ...values, id: userRecord.id });
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
    const user = await getAConsutanlt(userId);
    if (user) {
      setUserRecord(user);
      setFlagEditForm('edit');
      setShowModel(!showModal);
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
          toolBarRender={(action) => [
            <Button
              size="middle"
              key="buttonAddUser"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleModal()}
            >
              Add
            </Button>,
          ]}
        />
      </PageContainer>
      {flagEditForm === 'edit' ? (
        <ModalForm
          showModal={showModal}
          titleModal={`Edit ${userRecord.fullname}`}
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
