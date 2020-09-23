import { IntsKeys, StringsKeys, TimesKeys } from "./config";

export type DataType = "int" | "string" | "time";

export type Ints = keyof typeof IntsKeys;

export type Strings = keyof typeof StringsKeys;

export type Times = keyof typeof TimesKeys;

export type ComparisonOperatorType = Ints | Strings | Times;

export interface FieldInfo {
  name: string;
  dataType: string;
  portName: string;
  alias: string;
  selected: boolean;
  comment: string;
}
