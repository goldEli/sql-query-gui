import React from "react";
import styled from "styled-components";
import InputValue from "./Components/InputValue";
import SelectValue from "./Components/SelectValue";
import LogicalOperators from "./Components/LogicalOperators";

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

const defaultData = [
  [{ uiType: "addBtn" }, { uiType: "addParenBtn" }],
  [{ uiType: "leftParen" }],
  [
    { uiType: "space", value: 2 },
    { uiType: "select", value: "age" },
    { uiType: "comparisonPperators", value: "包含" },
    { uiType: "input" },
    { uiType: "logicalOperators", value: "与" }
    // { uiType: "time" }
  ],
  [
    { uiType: "space", value: 2 },
    { uiType: "select", value: "time" },
    { uiType: "comparisonPperators", value: "晚于" },
    { uiType: "time" },
    { uiType: "logicalOperators", value: "与" }
  ],
  [{ uiType: "rightParen" }]
];

const SqlEditor: React.FC<SqlEditorProps> = (props) => {
  const [data, setData] = React.useState<Data>([]);

  React.useEffect(() => {
    setData(addBtnInfo(defaultData));
  }, []);

  const addBtnInfo = (data: Data): data => {
    return data.map((row, index) => {
      if (index === 0) {
        return row;
      }
      return [
        { uiType: "delBtn" },
        { uiType: "addBtn" },
        { uiType: "addParenBtn" },
        ...row
      ];
    });
  };

  const SwitchItemUI = (props: {
    item: Item;
    onChange: (value: string) => void;
    addRow: () => void;
    delRow: () => void;
  }) => {
    const { item } = props;
    switch (item.uiType) {
      case "addBtn":
        return <Btn onClick={props.addRow}>+</Btn>;
      case "delBtn":
        return <Btn onClick={props.delRow}>-</Btn>;
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
        return (
          <LogicalOperators onChange={props.onChange} value={item.value} />
        );
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

  const delRow = (rowNum: number) => {
    return () => {
      setData((data) => {
        const curRow = data[rowNum];
        return data.filter((row, index) => index !== rowNum);
      });
    };
  };

  const addRow = (rowNum: number) => {
    return () => {
      setData((data) => {
        const curRow = data[rowNum];
        return [
          ...data.slice(0, rowNum + 1),
          [
            { uiType: "delBtn" },
            { uiType: "addBtn" },
            { uiType: "addParenBtn" },
            { uiType: "select", value: "" },
            { uiType: "comparisonPperators", value: "" },
            { uiType: "time", value: "" },
            { uiType: "logicalOperators", value: "" }
          ],
          ...data.slice(rowNum + 1, data.length)
        ];
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
                    addRow={addRow(rowNum)}
                    delRow={delRow(rowNum)}
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
  background-color: #e2e2e2;
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
