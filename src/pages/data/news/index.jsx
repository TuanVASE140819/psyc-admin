import { uploadFile } from '@/utils/uploadFile';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Space, Tag } from 'antd';
import React from 'react';
import { addNews, getNews, deleteNews, updateNews, getAnNews } from '@/services/news';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ModalForm from '@/components/ModalForm';

const News = () => {
  const column = [
    {
      title: 'No.',
      dataIndex: 'number',
      sorter: (a, b) => a.number - b.number,
      search: false,
      width: '10%',
    },
    {
      title: 'Tiêu đề bài viết',
      dataIndex: 'title',
      copyable: true,
      sorter: (a, b) => a.title.localeCompare(b.title),
      filters: true,
      onFilter: true,
      formItemProps: {
        rules: [
          {
            require: true,
            message: 'Enter News Title to search',
          },
        ],
      },
      width: '30%',
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'createDay', 
      valueType: 'dateTime',
      sorter: (a, b) => a.createdAt - b.createdAt,
      search: false,
      width: '20%',
      format: 'MM/YYYY',
      // ),
      width: '30%',
    },
    {
      title: 'trạng thái',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        null: { text: 'Đang chờ', status: 'Default' },
        active: { text: 'Đã duyệt', status: 'Success' },
        inactive: { text: 'Đã từ chối', status: 'Error' },
      },
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      search: false,
      render: (_, record) => {
        return (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '50%',
                marginRight: '8px',
              }}
            >
              <Button
                key="editNews"
                type="primary"
                size="middle"
                block={true}
                icon={<EditOutlined />}
                onClick={() => handleEditNewsForm(record)}
              ></Button>
            </div>
            <div
              style={{
                width: '50%',
              }}
            >
              <Button
                key="deleteNews"
                type="danger"
                size="middle"
                block="true"
                icon={<DeleteOutlined />}
                onClick={() => handleOkDeleteNews(record)}
              ></Button>
            </div>
          </div>
        );
      },
      width: '30%',
    },
  ];

  const buttonSubmitter = [
    {
      key: 'clearFieldFormNews',
      type: 'default',
      click: 'reset',
      name: 'Reset',
      loading: false,
    },
    {
      key: 'submitAddNews',
      type: 'primary',
      click: 'submit',
      name: 'Submit',
      loading: false,
    },
  ];

  const formFieldAdd = [
    {
      fieldType: 'formText',
      key: 'fieldAddTitle',
      label: 'Tiêu đề bài viết',
      width: 'lg',
      placeholder: 'Enter News Title',
      name: 'title',
      requiredField: 'true',
      ruleMessage: 'Input News Title before submit',
    },
    // {
    //   fieldType: 'formText',
    //   key: 'fieldAddNewsTag',
    //   label: 'News Tag',
    //   width: 'lg',
    //   placeholder: 'Enter News Tag',
    //   name: 'tag',
    //   requiredField: 'true',
    //   ruleMessage: 'Input News Tag before submit',
    // },
    {
      fieldType: 'formTextArea',
      key: 'fieldAddNewsDescription',
      label: 'Mô tả bài viết',
      width: 'lg',
      placeholder: 'Enter News description',
      name: 'description',
      requiredField: 'true',
      ruleMessage: 'Input description before submit',
    },
    // {
    //   fieldType: 'formTextArea',
    //   key: 'fieldAddNewsContent',
    //   label: 'Content',
    //   width: 'lg',
    //   placeholder: 'Enter News content',
    //   name: 'content',
    //   requiredField: 'true',
    //   ruleMessage: 'Input content before submit',
    // },
    {
      fieldType: 'formInputFileImg',
      key: 'fieldGetImgLink',
      label: 'News Banner',
      width: 'lg',
      placeholder: 'Banner Link',
      name: 'urlBanner',
      nameUpload: 'bannerNews',
      nameInputFile: 'newsFileToFirebase',
      readOnly: true,
      requiredField: 'true',
      ruleMessage: 'Upload image before submit',
    },
    {
      fieldType: 'EditorMainContent',
      nameTextArea: 'contentNews',
    },
  ];

  const formFieldEdit = [
    {
      fieldType: 'formText',
      key: 'fieldAddTitle',
      label: 'Tiêu đề bài viết',
      width: 'lg',
      placeholder: 'Enter News Title',
      name: 'title',
      requiredField: 'true',
      ruleMessage: 'Input News Title before submit',
    },
    // {
    //   fieldType: 'formText',
    //   key: 'fieldAddNewsTag',
    //   label: 'createDay',
    //   width: 'lg',
    //   placeholder: 'Enter News Tag',
    //   name: 'tag',
    //   requiredField: 'true',
    //   ruleMessage: 'Input News Tag before submit',
    // },
    {
      fieldType: 'formTextArea',
      key: 'fieldAddNewsDescription',
      label: 'Mô tả bài viết',
      width: 'lg',
      placeholder: 'Enter News description',
      name: 'description',
      requiredField: 'true',
      ruleMessage: 'Input description before submit',
    },
    // {
    //   fieldType: 'formTextArea',
    //   key: 'fieldAddNewsContent',
    //   label: 'Content',
    //   width: 'lg',
    //   placeholder: 'Enter News content',
    //   name: 'content',
    //   requiredField: 'true',
    //   ruleMessage: 'Input content before submit',
    // },
    {
      fieldType: 'formInputFileImg',
      key: 'fieldGetImgLink',
      label: 'Ảnh bìa',
      width: 'lg',
      placeholder: 'Banner Link',
      name: 'urlBanner',
      nameUpload: 'bannerNews',
      nameInputFile: 'newsFileToFirebase',
      readOnly: true,
      requiredField: 'true',
      ruleMessage: 'Upload image before submit',
    },
    {
      fieldType: 'EditorMainContent',
      nameTextArea: 'contentNews',
      // },
      // {
      //   fieldType: 'checkEdit',
      //   name: 'edit',
      //   value: 'edit',
    },
  ];

  //ref cua table, editor, form
  const tableNewsRef = React.useRef();
  const formNewsRef = React.useRef();
  const editorRef = React.useRef();
  //state cua editor
  const [stateEditor, setStateEditor] = React.useState(null);
  //state của uploadimg lên firebase
  const [imgLinkFirebase, setImgLinkFirebase] = React.useState(null);
  const [loadingUploadImgFirebase, setLoadingUploadingImgFirebase] = React.useState(false);
  //state cua modal add or edit
  const [showModal, setShowModal] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [newsRecord, setNewsRecord] = React.useState(null);
  const [flagEditForm, setFlagEditForm] = React.useState('');
  const [buttonSubmitterNews, setButtonSubmitterNews] = React.useState(buttonSubmitter);
  const [formFieldAddNews, setFormFieldAddNews] = React.useState(formFieldAdd);
  const [formFieldEditNews, setFormFieldEditNews] = React.useState(formFieldEdit);
  //paging
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(8);
  const [total, setTotal] = React.useState(20);
  //buttonEditLoading
  const [buttonEditLoading, setButtonEditLoading] = React.useState(false);
  //xuli loading upload img firebase
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

  //xuli loading button submit form add or edit news
  React.useEffect(() => {
    const newButtonSubmitNews = buttonSubmitterNews.map((item) => {
      if (item.name === 'Submit') {
        item.loading = buttonLoading;
      }
      return item;
    });
    setButtonSubmitterNews(newButtonSubmitNews);
  }, [buttonLoading]);

  React.useEffect(() => {
    if (buttonEditLoading) {
      message.loading('Đang tải ...', 9999);
    } else {
      message.destroy();
    }
    return () => {
      message.destroy();
    };
  }, [buttonEditLoading]);

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
      const imgLink = await uploadFile(file, 'news');

      if (imgLink) {
        setImgLinkFirebase(imgLink);
        formNewsRef?.current?.setFieldsValue({
          ['urlBanner']: imgLink,
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

  //xu li dong mo modal
  const handleModal = () => {
    setShowModal(!showModal);
    setFlagEditForm('');
    setNewsRecord(null);
    setImgLinkFirebase(null);
  };

  //xuli dong modal
  const handleCancelModal = () => {
    setShowModal(false);
    setButtonLoading(false);
    setFlagEditForm('');
    setNewsRecord(null);
    setImgLinkFirebase(null);
    setStateEditor(null);
    if (formNewsRef) {
      formNewsRef?.current?.resetFields();
    }
  };

  //xuli reset form
  const handleResetForm = () => {
    formNewsRef?.current?.resetFields();
    setStateEditor(null);
    setImgLinkFirebase(null);
  };

  //xuli submit form
  const handleSubmitFormNews = async (values) => {
    console.log(values);
    // setButtonLoading(true);
    // setStateEditor(values.htmlContent);
    if (values.edit) {
    //   const newValues = Object.assign({}, values);
    //   const attr = 'edit';
    //   const dataEdit = Object.keys(newValues).reduce((item, key) => {
    //     if (key !== attr) {
    //       item[key] = newValues[key];
    //     }
    //     return item;
    //   }, {});
    await updateNews({ ...values, id: newsRecord.id });
    setShowModal(false);
    } else {
      await addNews(values);
      handleResetForm();
      setShowModal(false);
    }
    tableNewsRef?.current?.reload();
    // setButtonLoading(false);
  };

  //xuli mo form edit zodiac
  const handleEditNewsForm = async (record) => {
    const idNews = record.id;
    setButtonEditLoading(true);
    const news = await getAnNews(idNews);
    setButtonEditLoading(false);
    if (news) {
      setNewsRecord(news);
      setStateEditor(news.contentNews);
      setFlagEditForm('edit');
      setShowModal(!showModal);
      formNewsRef?.current?.setFieldsValue(news);
    }
  };

  //xuli delete news
  const handleOkDeleteNews = async (record) => {
    const result = await deleteNews(record.id);
    if (result) {
      tableNewsRef?.current?.reload();
    }
  };

  //xuli change text in editor
  const handleChangeStateEditor = (state) => {
    if (state) {
      formNewsRef?.current?.setFieldsValue({
        ['contentNews']: state,
      });
    }
  };

  //xuli up anh trong text editor
  const handleUploadImgInEditor = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    console.log('A');
    input.onchange = async () => {
      console.log('b');

      try {
        console.log('c');

        let file = input.files[0];
        message.loading('Upload...', 9999);
        const imgLinkEditor = await uploadFile(file, 'editor');
        message.destroy();
        if (imgLinkEditor) {
          message.success('Add Image Success!');
          const range = editorRef?.current?.getEditorSelection();
          editorRef?.current?.getEditor().insertEmbed(range.index, 'image', imgLinkEditor);
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  return (
    <>
      <PageContainer>
        <ProTable
          columns={column}
          actionRef={tableNewsRef}
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
            searchText: 'Search',
            submittext: 'Submit',
            resetText: 'Reset',
          }}
          toolBarRender={(action) => [
            <Button
              size="middle"
              key="buttonAddNews"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleModal()}
            >
              Add
            </Button>,
          ]}
          request={async (params, sort, filter) => {
            // const currentAttr = 'current';
            // const pageSizeAttr = 'pageSize';
            // console.log(params);
            const data = [];
            // if (params.title) {
            //   const newParams = Object.keys(params).reduce((item, key) => {
            //     if (key != currentAttr && key != pageSizeAttr) {
            //       if (key === 'title') {
            //         item.title = params[key];
            //       } else {
            //         item[key] = params[key];
            //       }
            //     }
            //     return item;
            //   }, {});

            //   await getNews(newParams).then((res) => {
            //     res?.data?.map((item, index) => {
            //       item.number = index + 1;
            //       data[index] = item;
            //     });
            //     setTotal(res?.total);
            //   });
            // } else {
            await getNews(params).then((res) => {
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
        />
      </PageContainer>
      {flagEditForm === 'edit' ? (
        <ModalForm
          showModal={showModal}
          titleModal={`Chỉnh sửa  ${newsRecord.title}`}
          widthModal="900"
          handleCancelModel={handleCancelModal}
          formRef={formNewsRef}
          buttonSubmitter={buttonSubmitterNews}
          handleSubmitForm={handleSubmitFormNews}
          formField={formFieldEditNews}
          customUpload={customUpload}
          imgLinkFirebase={imgLinkFirebase}
          stateEditor={stateEditor}
          handleChangeStateEditor={handleChangeStateEditor}
          editorRef={editorRef}
          handleUploadImgInEditor={handleUploadImgInEditor}
          handleResetForm={handleResetForm}
        />
      ) : (
        <ModalForm
          showModal={showModal}
          titleModal="Thêm tin tức"
          widthModal="900"
          handleCancelModel={handleCancelModal}
          formRef={formNewsRef}
          buttonSubmitter={buttonSubmitterNews}
          handleSubmitForm={handleSubmitFormNews}
          formField={formFieldAddNews}
          customUpload={customUpload}
          imgLinkFirebase={imgLinkFirebase}
          stateEditor={stateEditor}
          handleChangeStateEditor={handleChangeStateEditor}
          editorRef={editorRef}
          handleUploadImgInEditor={handleUploadImgInEditor}
          handleResetForm={handleResetForm}
        />
      )}
    </>
  );
};

export default News;
