import React from "react";
import styled from "styled-components";
import InputValue from "./Components/InputValue";

interface SqlEditorProps {}

enum UI_TYPE {
  leftParen,
  rightParen,
  space,
  select,
  input,
  time,
  comparisonPperators,
  logicalOperators
}

type UI_TYPE_KEY = keyof typeof UI_TYPE;

interface Item {
  uiType: UI_TYPE_KEY;
  value?: string | number;
}

type Data = Item[][];

const switchItemUI = (item: Item) => {
  switch (item.uiType) {
    case "comparisonPperators":
      return <span>大于</span>;

    case "input":
      return <InputValue value={item.value} />;
    case "leftParen":
      return <span>(</span>;
    case "rightParen":
      return <span>)</span>;
    case "logicalOperators":
      return <span>{item.value}</span>;
    case "select":
      return <span>{item.value}</span>;
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
    ]);
  }, []);

  return (
    <Box>
      {data.map((row) => {
        return (
          <Row>
            {row.map((col) => {
              return (
                <>
                  {switchItemUI(col)}
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
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export default SqlEditor;
