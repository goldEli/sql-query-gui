import React from "react";
import { Modal, Input } from "antd";

interface InputValueProps {
  value?: string;
  onChange: (value: string) => void;
}

const InputValue: React.FC<InputValueProps> = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleOk = () => {
    props.onChange(value);
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
        <Input
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          value={value}
        />
      </Modal>
    </>
  );
};

export default InputValue;
