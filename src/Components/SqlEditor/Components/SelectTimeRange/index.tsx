import React from "react";
import { Modal, Select, DatePicker, TimePicker } from "antd";

import styled from "styled-components";
import moment from "moment";

import { defautValue } from "../../config";

const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

interface SelectTimeRangeProps {
  value?: string;
  onChange: (value: string) => void;
  // list: string[];
}

const timeFormat = "HH:mm:ss";

const SelectTimeRange: React.FC<SelectTimeRangeProps> = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState(["", ""]);

  React.useEffect(() => {
    if (props.value?.split(" ").length === 2) {
      // props.onChange(props.list[0]);
      setValue(props.value.split(" "));
    }
  }, [props.value]);

  const handleOk = () => {
    props.onChange(value.join(" "));
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
          <TimePicker
            format={timeFormat}
            onChange={(time) => {
              setValue((value) => {
                return [time.format(timeFormat), value[1] || "00:00:00"];
              });
            }}
          />
          <TimePicker
            format={timeFormat}
            onChange={(time) => {
              setValue((value) => {
                return [value[0] || "00:00:00", time.format(timeFormat)];
              });
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

export default SelectTimeRange;
