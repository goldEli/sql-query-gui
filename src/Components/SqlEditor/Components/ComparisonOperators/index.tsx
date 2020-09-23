import React from "react";
import { Modal, Select } from "antd";
import styled from "styled-components";

import { defautValue, comparisonPperatorsList } from "../../config";
import { DataType } from "../../type";

const { Option } = Select;

interface ComparisonOperatorsProps {
  value?: string;
  onChange: (value: string) => void;
  list: string[];
}

const ComparisonOperators: React.FC<ComparisonOperatorsProps> = (props) => {
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
      <span onClick={() => setVisible(true)}>
        {getOperatorsName(props.value) || "<?>"}
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
              props.onChange(value);
              setVisible(false);
            }}
          >
            {props.list?.map((item) => (
              <Option key={item} value={item}>
                {getOperatorsName(item)}
              </Option>
            ))}
          </Select>
        </Box>
      </Modal>
    </>
  );
};

const getOperatorsName = (value?: string) => {
  return value?.split("/")?.[0];
};

const Box = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ComparisonOperators;
