export type DataType = "int" | "string" | "time";

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

export type Ints = keyof typeof IntsKeys;

export enum StringsKeys {
  "byte",
  "string"
}

export type Strings = keyof typeof StringsKeys;

export enum TimesKeys {
  "date",
  "datetime",
  "timestamp",
  "time"
}

export type Times = keyof typeof TimesKeys;
