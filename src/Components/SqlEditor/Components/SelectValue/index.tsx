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

const defaultData = [
  {
    name: "id",
    dataType: "String",
    portName: "dataset",
    alias: "id",
    selected: false,
    comment: "组件ID"
  },
  {
    name: "code",
    dataType: "String",
    portName: "dataset",
    alias: "code",
    selected: false,
    comment: "算法编码"
  },
  {
    name: "grp_id",
    dataType: "String",
    portName: "dataset",
    alias: "grp_id",
    selected: false,
    comment: "组件属于的分组ID"
  },
  {
    name: "name",
    dataType: "String",
    portName: "dataset",
    alias: "name",
    selected: false,
    comment: "组件名称"
  },
  {
    name: "sort_type",
    dataType: "String",
    portName: "dataset",
    alias: "sort_type",
    selected: false,
    comment: "算法分类"
  },
  {
    name: "data",
    dataType: "String",
    portName: "dataset",
    alias: "data",
    selected: false,
    comment: "算法json参数"
  },
  {
    name: "description",
    dataType: "String",
    portName: "dataset",
    alias: "description",
    selected: false,
    comment: "组件简单描述"
  },
  {
    name: "create_time",
    dataType: "DateTime",
    portName: "dataset",
    alias: "create_time",
    selected: false,
    comment: "创建时间"
  },
  {
    name: "user_id",
    dataType: "String",
    portName: "dataset",
    alias: "user_id",
    selected: false,
    comment: "用户id"
  },
  {
    name: "update_time",
    dataType: "DateTime",
    portName: "dataset",
    alias: "update_time",
    selected: false,
    comment: "更新时间"
  }
];

export default SelectValue;
