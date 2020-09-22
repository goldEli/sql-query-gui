import React from "react";
import styled from "styled-components";
import InputValue from "./Components/InputValue";
import SelectValue from "./Components/SelectValue";
import LogicalOperators from "./Components/LogicalOperators";
import ComparisonOperators from "./Components/ComparisonOperators";
import { comparisonPperatorsList } from "./config";

import { DataType } from "./type";
import { IntsKeys, StringsKeys, TimesKeys } from "./config";

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
    { uiType: "select", value: "" },
    { uiType: "comparisonPperators", value: "" },
    { uiType: "input" },
    { uiType: "logicalOperators", value: "" }
  ],
  [
    { uiType: "select", value: "" },
    { uiType: "comparisonPperators", value: "" },
    { uiType: "time" },
    { uiType: "logicalOperators", value: "" }
  ],
  [{ uiType: "rightParen" }]
];

const btnsData = [
  { uiType: "delBtn" },
  { uiType: "addBtn" },
  { uiType: "addParenBtn" }
];

const tabNum = 2;

const SqlEditor: React.FC<SqlEditorProps> = (props) => {
  const [data, setData] = React.useState<Data>([]);

  React.useEffect(() => {
    setData(addBtnInfo(defaultData));
  }, []);

  const addBtnInfo = (data: Data): Data => {
    return data.map((row, index) => {
      if (index === 0) {
        return row;
      }
      return [...row, ...btnsData];
    });
  };

  const SwitchItemUI = (props: {
    item: Item;
    dataType?: DataType;
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
        return (
          <ComparisonOperators
            // dataType={props.dataType}
            list={
              comparisonPperatorsList[props.dataType]?.map(
                (item) => item.label
              ) || []
            }
            onChange={props.onChange}
            value={item.value}
          />
        );

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
        return (
          <SelectValue
            list={defaultSelectData.map((item) => item.comment)}
            onChange={props.onChange}
            value={item.value}
          />
        );
      case "time":
        return <span>2019-12-10</span>;
      case "space":
        return <Spacer num={item.value} />;
      default:
        return <div>no ui</div>;
    }
  };

  const getFieldType = (
    comment?: string,
    fieldData: typeof defaultSelectData
  ): DataType | undefined => {
    if (!comment) return void 0;
    // comment = comment.toLocaleLowerCase()

    for (let item of fieldData) {
      if (item.comment === comment) {
        const type = item.dataType.toLocaleLowerCase();
        if (Object.values(IntsKeys).includes(type)) {
          return "int";
        }
        if (Object.values(StringsKeys).includes(type)) {
          return "string";
        }
        if (Object.values(TimesKeys).includes(type)) {
          return "time";
        }
      }
    }
    return void 0;
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
            { uiType: "select", value: "" },
            { uiType: "comparisonPperators", value: "" },
            { uiType: "input", value: "" },
            { uiType: "logicalOperators", value: "" },
            ...btnsData
          ],
          ...data.slice(rowNum + 1, data.length)
        ];
      });
    };
  };

  let leftParenNum = 0;

  const calSpacerNum = (item: Item[]): number => {
    if (item.some((e) => e.uiType === "leftParen")) {
      leftParenNum += 1;
      return tabNum * (leftParenNum - 1);
    }
    if (item.some((e) => e.uiType === "rightParen")) {
      leftParenNum -= 1;
    }
    if (leftParenNum > 0) {
      return tabNum * leftParenNum;
    }

    return 0;
  };

  return (
    <Box>
      {data.map((row, rowNum) => {
        const comment = row.find((item) => item.uiType === "select")?.value;

        const dataType = getFieldType(comment, defaultSelectData);
        const spacerNum = calSpacerNum(row);
        return (
          <Row>
            <Spacer num={spacerNum} />
            <>
              {row.map((col, colNum) => {
                return (
                  <>
                    <SwitchItemUI
                      key={colNum.toString()}
                      item={col}
                      onChange={onChange(rowNum, colNum)}
                      addRow={addRow(rowNum)}
                      delRow={delRow(rowNum)}
                      dataType={dataType}
                    />
                    <Spacer num={1} />
                  </>
                );
              })}
            </>
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

const defaultSelectData = [
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

export default SqlEditor;
