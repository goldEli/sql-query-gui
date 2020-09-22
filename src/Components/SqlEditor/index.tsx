import React from "react";
import styled from "styled-components";
import InputValue from "./Components/InputValue";
import SelectValue from "./Components/SelectValue";

interface SqlEditorProps {}

enum UI_TYPE {
  leftParen,
  rightParen,
  space,
  select,
  input,
  time,
  comparisonPperators,
  logicalOperators,
  addBtn,
  delBtn,
  addParenBtn
}

type UI_TYPE_KEY = keyof typeof UI_TYPE;

interface Item {
  uiType: UI_TYPE_KEY;
  value?: string | number;
}

type Data = Item[][];

const SwitchItemUI = (props: {
  item: Item;
  onChange: (value: string) => void;
}) => {
  const { item } = props;
  switch (item.uiType) {
    case "addBtn":
      return <Btn>+</Btn>;
    case "delBtn":
      return <Btn>-</Btn>;
    case "addParenBtn":
      return <Btn>( )</Btn>;
    case "comparisonPperators":
      return <span>大于</span>;
    case "input":
      return <InputValue onChange={props.onChange} value={item.value} />;
    case "leftParen":
      return <span>(</span>;
    case "rightParen":
      return <span>)</span>;
    case "logicalOperators":
      return <span>{item.value}</span>;
    case "select":
      return <SelectValue onChange={props.onChange} value={item.value} />;
    case "time":
      return <span>2019-12-10</span>;
    case "space":
      return <Spacer num={item.value} />;
    default:
      return <div>no ui</div>;
  }
};

const SqlEditor: React.FC<SqlEditorProps> = (props) => {
  const [data, setData] = React.useState<Data>([]);

  React.useEffect(() => {
    setData([
      [{ uiType: "addBtn" }, { uiType: "addParenBtn" }],
      [{ uiType: "delBtn" }, { uiType: "leftParen" }],
      [
        { uiType: "delBtn" },
        { uiType: "space", value: 2 },
        { uiType: "select", value: "age" },
        { uiType: "comparisonPperators", value: "包含" },
        { uiType: "input" },
        { uiType: "logicalOperators", value: "与" }
        // { uiType: "time" }
      ],
      [
        { uiType: "delBtn" },
        { uiType: "space", value: 2 },
        { uiType: "select", value: "time" },
        { uiType: "comparisonPperators", value: "晚于" },
        { uiType: "time" },
        { uiType: "logicalOperators", value: "与" }
      ],
      [{ uiType: "delBtn" }, { uiType: "rightParen" }]
    ]);
  }, []);

  const onChange = (rowNum: number, colNum: number) => {
    return (value: string) => {
      setData((data) => {
        return data.map((row, r) => {
          if (rowNum === r) {
            return row.map((col, c) => {
              if (colNum === c) {
                return { ...col, value };
              }
              return col;
            });
          }
          return row;
        });
      });
    };
  };

  return (
    <Box>
      {data.map((row, rowNum) => {
        return (
          <Row>
            {row.map((col, colNum) => {
              return (
                <>
                  <SwitchItemUI
                    item={col}
                    onChange={onChange(rowNum, colNum)}
                  />
                  <Spacer num={1} />
                </>
              );
            })}
          </Row>
        );
      })}
    </Box>
  );
};

const Btn = styled.span`
  display: inline-block;
  width: 16px;
  border-radius: 4px;
  background-color: #bbb8b8;
  color: #fff;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
`;

const Box = styled.div`
  width: 100%;
  min-height: 300px;
  padding: 8px;
`;

const Spacer = styled.span`
  display: inline-block;
  width: ${(props: { num: number }) => (props.num || 0) * 8}px;
`;

const Row = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export default SqlEditor;
