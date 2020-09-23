import React from "react";
import styled from "styled-components";
import InputValue from "./Components/InputValue";
import SelectValue from "./Components/SelectValue";
import LogicalOperators from "./Components/LogicalOperators";
import ComparisonOperators from "./Components/ComparisonOperators";
import SelectDate from "./Components/SelectDate";
import SelectDateRange from "./Components/SelectDateRange";
import SelectTimeRange from "./Components/SelectTimeRange";

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
  condition,
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
  // [{ uiType: "addBtn" }, { uiType: "addParenBtn" }],
  [{ uiType: "leftParen" }],
  [
    { uiType: "select", value: "" },
    { uiType: "comparisonPperators", value: "" },
    { uiType: "condition" },
    { uiType: "logicalOperators", value: "" }
  ],
  [
    { uiType: "select", value: "" },
    { uiType: "comparisonPperators", value: "" },
    { uiType: "condition" },
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
      return [...row, ...btnsData];
    });
  };

  const SwitchItemUI = (props: {
    item: Item;
    dataType: DataType;
    comparisonOperatorType: string;
    onChange: (value: string) => void;
    addRow: () => void;
    delRow: () => void;
    addParen: () => void;
  }) => {
    const { item } = props;
    switch (item.uiType) {
      case "addBtn":
        return <Btn onClick={props.addRow}>+</Btn>;
      case "delBtn":
        return <Btn onClick={props.delRow}>-</Btn>;
      case "addParenBtn":
        return <Btn onClick={props.addParen}>( )</Btn>;
      case "comparisonPperators":
        return (
          <ComparisonOperators
            // dataType={props.dataType}
            list={
              comparisonPperatorsList[props.dataType]?.map(
                (item) => `${item.label}/${item.id}`
              ) || []
            }
            onChange={props.onChange}
            value={item.value}
          />
        );

      case "condition":
        if (props.dataType === "time") {
          if (props.comparisonOperatorType === "dateRange") {
            return (
              <SelectDateRange onChange={props.onChange} value={item.value} />
            );
          }
          if (props.comparisonOperatorType === "timeRange") {
            return (
              <SelectTimeRange onChange={props.onChange} value={item.value} />
            );
          }
          // SelectTimeRange
          return <SelectDate onChange={props.onChange} value={item.value} />;
        }
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
            list={defaultSelectData.map(
              (item) => `${item.comment}/${item.dataType}`
            )}
            onChange={props.onChange}
            value={item.value}
          />
        );
      case "space":
        return <Spacer num={item.value} />;
      default:
        return <div>no ui</div>;
    }
  };

  const getFieldType = (fieldValue?: string): DataType | undefined => {
    if (!fieldValue) return void 0;
    const type = fieldValue.split("/")[1]?.toLocaleLowerCase();

    if (Object.values(IntsKeys).includes(type)) {
      return "int";
    }
    if (Object.values(StringsKeys).includes(type)) {
      return "string";
    }
    if (Object.values(TimesKeys).includes(type)) {
      return "time";
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

  const isLeftParan = (item: Item[] = []) => {
    return item.some((e) => e.uiType === "leftParen");
  };

  const isRightParan = (item: Item[] = []) => {
    return item.some((e) => e.uiType === "rightParen");
  };

  const delRow = (rowNum: number) => {
    return () => {
      setData((data) => {
        const curRow = data[rowNum];
        const leftParen = isLeftParan(curRow);
        const rightParen = isRightParan(curRow);
        const isOnlyOneInParen =
          isLeftParan(data[rowNum - 1]) && isRightParan(data[rowNum + 1]);

        if (isOnlyOneInParen) {
          return data.filter(
            (row, index) => ![rowNum, rowNum + 1, rowNum - 1].includes(index)
          );
        }

        if (leftParen) {
          let parenNum = 0;
          return data.filter((row, index) => {
            if (index === rowNum) {
              parenNum += 1;
              return false;
            }
            if (isLeftParan(row) && parenNum > 0) {
              parenNum += 1;
              return false;
            }
            if (isRightParan(row) && parenNum > 0) {
              parenNum -= 1;
              return false;
            }
            return parenNum === 0;
          });
        }

        if (rightParen) {
          let parenNum = 0;
          return data
            .slice()
            .reverse()
            .filter((row, index) => {
              if (index === data.length - 1 - rowNum) {
                parenNum += 1;
                return false;
              }
              if (isRightParan(row) && parenNum > 0) {
                parenNum += 1;
                return false;
              }
              if (isLeftParan(row) && parenNum > 0) {
                parenNum -= 1;
                return false;
              }
              return parenNum === 0;
            })
            .reverse();
        }

        return data.filter((row, index) => index !== rowNum);
      });
    };
  };

  const addRow = (rowNum: number) => {
    return () => {
      setData((data) => {
        // const curRow = data[rowNum];
        return [
          ...data.slice(0, rowNum + 1),
          [
            { uiType: "select", value: "" },
            { uiType: "comparisonPperators", value: "" },
            { uiType: "condition", value: "" },
            { uiType: "logicalOperators", value: "" },
            ...btnsData
          ],
          ...data.slice(rowNum + 1, data.length)
        ];
      });
    };
  };

  const addParen = (rowNum: number) => {
    return () => {
      setData((data) => {
        // const curRow = data[rowNum];
        return [
          ...data.slice(0, rowNum + 1),
          [{ uiType: "leftParen" }, ...btnsData],
          [
            { uiType: "select", value: "" },
            { uiType: "comparisonPperators", value: "" },
            { uiType: "condition", value: "" },
            { uiType: "logicalOperators", value: "" },

            ...btnsData
          ],
          [{ uiType: "rightParen" }, ...btnsData],
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
      <Btn visible onClick={addRow(-1)}>
        +
      </Btn>
      <Spacer num={1} />
      <Btn visible onClick={addParen(-1)}>
        ( )
      </Btn>
      <>
        {data.map((row, rowNum) => {
          const fieldValue = row.find((item) => item.uiType === "select")
            ?.value;
          const comparisonOperatorValue = row.find(
            (item) => item.uiType === "comparisonPperators"
          )?.value;
          const dataType = getFieldType(fieldValue);
          const comparisonOperatorType = getComparisonOperatorType(
            comparisonOperatorValue
          );
          const spacerNum = calSpacerNum(row);
          return (
            <Row key={rowNum.toString()}>
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
                        addParen={addParen(rowNum)}
                        dataType={dataType}
                        comparisonOperatorType={comparisonOperatorType}
                      />
                      <Spacer num={1} />
                    </>
                  );
                })}
              </>
            </Row>
          );
        })}
      </>
    </Box>
  );
};

const getComparisonOperatorType = (value?: string) => {
  return value?.split("/")?.[1];
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
  user-select: none;
  visibility: ${(props: { visible?: boolean }) =>
    props.visible ? "visbile" : "hidden"};
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
  &:hover ${Btn} {
    visibility: visible;
  }
`;

const defaultSelectData = [
  {
    name: "create_time",
    dataType: "DateTime",
    portName: "dataset",
    alias: "create_time",
    selected: false,
    comment: "创建时间"
  },
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
