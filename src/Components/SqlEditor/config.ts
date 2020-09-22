export const defautValue = "</>";

export const logicalOperatorsList = {
  and: "与",
  or: "或"
};

export enum IntsKeys {
  "double",
  "long",
  "integer",
  "float",
  "short",
  "int",
  "bigdecimal",
  "decimal"
}

export enum StringsKeys {
  "byte",
  "string"
}

export enum TimesKeys {
  "date",
  "datetime",
  "timestamp",
  "time"
}

export const comparisonPperatorsList = {
  int: [
    { id: "<=", label: "小于等于" },
    { id: ">=", label: "大于等于" },
    { id: "<", label: "小于" },
    { id: ">", label: "大于" },
    { id: "!=", label: "不等于" },
    { id: "=", label: "等于" },
    { id: "in", label: "属于" },
    { id: "not in", label: "不属于" },
    { id: "is null", label: "空" },
    { id: "is not null", label: "不为空" }
  ],
  string: [
    { id: "<=", label: "小于等于" },
    { id: ">=", label: "大于等于" },
    { id: "<", label: "小于" },
    { id: ">", label: "大于" },
    { id: "!=", label: "不等于" },
    { id: "=", label: "等于" },
    { id: "in", label: "属于" },
    { id: "not in", label: "不属于" },
    { id: "contain", label: "包含" },
    { id: "uncontain", label: "不包含" },
    { id: "startwith", label: "以指定开始" },
    { id: "startnot", label: "不以指定开始" },
    { id: "endwith", label: "以指定字符结束" },
    { id: "endnot", label: "不以指定字符结束" },
    { id: "is null", label: "空" },
    { id: "is not null", label: "不为空" }
  ],
  time: [
    { id: "<=", label: "早于等于" },
    { id: ">=", label: "晚于等于" },
    { id: "<", label: "早于" },
    { id: ">", label: "晚于" },
    { id: "!=", label: "不等于" },
    { id: "=", label: "等于" },
    { id: "is null", label: "空" },
    { id: "is not null", label: "不为空" }
  ]
};
