import React from "react";
import { Modal, Input } from "antd";

interface InputValueProps {
  value?: string;
}

const InputValue: React.FC<InputValueProps> = (props) => {
  const [visible, setVisible] = React.useState(false);

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <span onClick={() => setVisible(true)}>{props.value || "<?>"}</span>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input autoFocus defaultValue={props.value} />
      </Modal>
    </>
  );
};

export default InputValue;
