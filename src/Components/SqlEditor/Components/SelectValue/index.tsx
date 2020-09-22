import React from "react";
import { Modal, Select } from "antd";
const { Option } = Select;

interface SelectValueProps {
  value?: string;
  onChange: (value: string) => void;
}

const SelectValue: React.FC<SelectValueProps> = (props) => {
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
        title="请选择"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          style={{ width: "200px" }}
          showSearch
          autoFocus
          value={value}
          onChange={(value) => setValue(value)}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
        </Select>
      </Modal>
    </>
  );
};

export default SelectValue;
