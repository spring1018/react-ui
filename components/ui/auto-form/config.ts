import AutoFormCheckbox from "./fields/checkbox";
import { AutoFormComboBox } from './fields/combobox';
import AutoFormDate from "./fields/date";
import AutoFormEnum from "./fields/enum";
import AutoFormFile from "./fields/file";
import AutoFormInput from "./fields/input";
import AutoFormNumber from "./fields/number";
import AutoFormRadioGroup from "./fields/radio-group";
import AutoFormSwitch from "./fields/switch";
import AutoFormTextarea from "./fields/textarea";

export const INPUT_COMPONENTS = {
  checkbox: AutoFormCheckbox,
  date: AutoFormDate,
  select: AutoFormEnum,
  radio: AutoFormRadioGroup,
  switch: AutoFormSwitch,
  textarea: AutoFormTextarea,
  number: AutoFormNumber,
  file: AutoFormFile,
  fallback: AutoFormInput,
  combobox: AutoFormComboBox,
};

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
  [key: string]: keyof typeof INPUT_COMPONENTS;
} = {
  ZodBoolean: "checkbox",
  ZodDate: "date",
  ZodEnum: "combobox",
  ZodNativeEnum: "select",
  ZodNumber: "number",
};
