import { Col, Modal, Row, Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Question from './Question';
import ModalForm from '@/components/ModalForm';
import { Input } from 'antd';

const QuestionList = (props) => {
  const { dataList } = props;
  const { TextArea } = Input;

  const [showModal, setShowModal] = React.useState(false);
  //xu li dong mo modal
  const handleModal = () => {
    setShowModal(false);
  };
  //xuli dong modal
  const handleCancelModal = () => {
    setShowModal(false);
  };
  //
  const handleOk = () => {
    setShowModal(false);
  };

  return (
    <>
      <Col
        gutter={[16, 16]}
        style={{
          marginBottom: '12px',
          marginTop: '12px',
        }}
      >
        <Question onClick={() => handleModal()} />
      </Col>
      <Modal title="" open={handleModal} onCancel={handleCancelModal} width={1000}>
        <h1>Câu hỏi 1: Chọn câu trả lời mô tả đúng nhất về tính cách của bạn</h1>

        <Col>
          <TextArea rows={2} value="Tôi thích nói ra suy nghĩ của mình" />
          <TextArea rows={2} value="Tôi thường nghĩ ra những ý tưởng độc đáo" />
          <TextArea rows={2} value="Người khác thấy tôi hữu ích" />
          <TextArea rows={2} value="Tôi luôn luôn vui vẻ" />
        </Col>
      </Modal>
    </>
  );
};

export default QuestionList;
