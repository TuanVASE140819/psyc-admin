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
    </>
  );
};

export default QuestionList;
