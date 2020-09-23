import React from "react";
import { Modal, Select, DatePicker } from "antd";
import styled from "styled-components";
import moment from "moment";

import { defautValue } from "../../config";

const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

interface SelectDateRangeProps {
  value?: string;
  onChange: (value: string) => void;
  // list: string[];
}

const dateFormat = "YYYY-MM-DD HH:mm:ss";

const SelectDateRange: React.FC<SelectDateRangeProps> = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (props.value) {
      // props.onChange(props.list[0]);
      setValue(props.value);
    }
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
      <span style={{ fontWeight: "bold" }} onClick={() => setVisible(true)}>
        {props.value || "<?>"}
      </span>
      <Modal
        title="请选择"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Box>
          <RangePicker
            showTime
            format={dateFormat}
            onChange={(dateList) => {
              const value = dateList
                .map((date) => date.format(dateFormat))
                .join(" ");
              setValue(value);
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

const Box = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SelectDateRange;
