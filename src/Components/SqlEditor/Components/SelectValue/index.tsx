import React from "react";
import { Modal, Select } from "antd";
import styled from "styled-components";

import { defautValue } from "../../config";

const { Option } = Select;

interface SelectValueProps {
  value?: string;
  onChange: (value: string) => void;
  list: string[];
}

const SelectValue: React.FC<SelectValueProps> = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (!props.value) {
      props.onChange(props.list[0]);
    } else {
      setValue(props.value);
    }
  }, [props.value, props.list]);

  const handleOk = () => {
    props.onChange(value);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <span style={{ fontWeight: "bold" }} onClick={() => setVisible(true)}>
        {getName(props.value) || "<?>"}
      </span>
      <Modal
        title="请选择"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Box>
          <Select
            style={{ width: "200px" }}
            showSearch
            autoFocus
            value={value || defautValue}
            onChange={(value) => {
              // setValue(value)
              props.onChange(value);
              setVisible(false);
            }}
          >
            {props?.list?.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Box>
      </Modal>
    </>
  );
};

const getName = (value: string) => {
  return value?.split("/")?.[0];
};

const Box = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SelectValue;
