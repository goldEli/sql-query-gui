import React from "react";

interface LogicalOperatorsProps {
  value?: string;
  onChange: (value: string) => void;
}

const data = ["与", "或"];

const LogicalOperators: React.FC<LogicalOperatorsProps> = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState(data[0]);

  React.useEffect(() => {
    if (!props.value) {
      props.onChange(data[0]);
    } else {
      setValue(props.value);
    }
  }, [props.value]);

  const handleOk = () => {
    props.onChange(value);
    setVisible(false);
  };

  // const handleCancel = () => {
  //   setVisible(false);
  // };

  return (
    <>
      <span
        onClick={() => {
          let index = data.indexOf(props.value);
          index = index + 1 === data.length ? 0 : index + 1;
          props.onChange(data[index]);
        }}
      >
        {props.value || "<?>"}
      </span>
    </>
  );
};

export default LogicalOperators;
