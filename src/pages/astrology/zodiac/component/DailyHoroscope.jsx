import { getDailyHoroscope, getDailyHoroscopes } from '@/services/ant-design-pro/dailyHoroscope';
import { Avatar, Card, Col, Divider, message, Row, Skeleton, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import ModalForm from '@/components/ModalForm';
import { uploadFile } from '@/utils/uploadFile';

const formEditFields = [
  {
    fieldType: 'formText',
    key: 'affection',
    label: 'Tình cảm',
    width: 'lg',
    placeholder: 'Vui lòng nhập trường này',
    name: 'affection',
    requiredField: 'true',
  },
  {
    fieldType: 'formText',
    key: 'color',
    label: 'Màu sắc',
    width: 'lg',
    placeholder: 'Vui lòng nhập trường này',
    name: 'color',
    requiredField: 'true',
  },
  {
    fieldType: 'formTextArea',
    key: 'context',
    label: 'Định nghĩa',
    width: 'lg',
    placeholder: 'Vui lòng nhập trường này',
    name: 'context',
    requiredField: 'true',
  },
  {
    fieldType: 'formInputFileImg',
    key: 'imageUrl',
    label: 'Hình ảnh',
    width: 'lg',
    placeholder: 'Icon Link',
    name: 'imageUrl',
    nameUpload: 'iconHouse',
    nameInputFile: 'houseFileToFirebase',
    readOnly: 'true',
    requiredField: 'true',
    ruleMessage: 'Upload image before submit',
  },
];

export default function DailyHoroscope({ zodiac }) {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(moment());
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const formEditRef = useRef();
  const [image, setImage] = useState();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await getDailyHoroscopes({
          id: zodiac.id,
          date: month.format('YYYY-MM'),
        });
        setData(res);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [month, zodiac]);

  const showModal = () => setModal(true);
  const hideModal = () => setModal(false);

  const onPressDate = async (item) => {
    try {
      message.loading({ content: 'Loading...', key: 'loading' });
      const res = await getDailyHoroscope(item.id);
      formEditRef?.current?.setFieldsValue({ ...res });
      setImage(res.imageUrl);
      setSelectedDate(res);
      showModal();
    } catch (error) {
    } finally {
      message.destroy('loading');
    }
  };

  const customUpload = async ({ onError, onSuccess, file }) => {
    const isImage = file.type.indexOf('image/') === 0;
    if (!isImage) {
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
      message.loading({ content: 'Uploading...', key: 'loading' });
      const imgLink = await uploadFile(file, 'house');

      if (imgLink) {
        setImage(imgLink);
        formEditRef?.current?.setFieldsValue({
          imageUrl: imgLink,
        });
        message.success('Upload Image Success!');
      }
    } catch (error) {
      onError(error);
    } finally {
      message.destroy('loading');
    }
  };

  return (
    <>
      <DatePicker value={month} onChange={setMonth} picker="month" />
      <Divider />
      {loading ? (
        <Skeleton />
      ) : (
        <Row
          gutter={[16, 16]}
          style={{
            marginBottom: '12px',
          }}
        >
          {data.map((item) => {
            const date = moment(item.date).date();

            return (
              <Col key={item.id}>
                <Card hoverable style={{ width: 210 }} onClick={() => onPressDate(item)}>
                  <Card.Meta avatar={<Avatar src={item.imageUrl} />} title={`Ngày ${date}`} />
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
      <ModalForm
        showModal={modal}
        titleModal={`Chỉnh sửa ,,...`}
        widthModal="900"
        handleCancelModel={hideModal}
        formRef={formEditRef}
        // buttonSubmitter={buttonSubmitterHouse}
        // handleSubmitForm={handleSubmitFormHouse}
        formField={formEditFields}
        customUpload={customUpload}
        imgLinkFirebase={image}
        // stateEditor={stateEditor}
        // handleChangeStateEditor={handleChangeStateEditor}
        // editorRef={editorRef}
        // handleUploadImgInEditor={handleUploadImgInEditor}
        // handleResetForm={handleResetForm}
      />
    </>
  );
}
