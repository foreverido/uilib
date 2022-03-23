import { ChangeEvent, FormHTMLAttributes, ReactNode } from 'react';
import { ValidationSchema, ValidationError } from 'fastest-validator';

export type FormValidationSchema = ValidationSchema;

export type FormValues = { [name: string]: any };

type FieldError = {
  type: string; // error type
  message: string;
  expected?: boolean;
  actual?: boolean;
};

type FieldsFlags = { [name: string]: boolean };

type FieldsErrors = { [name: string]: FieldError };

export type ValidationStateParams = {
  values: FormValues;
  disabled: FieldsFlags;
};

export type ValidationState = {
  isValid: boolean;
  errors: FieldsErrors;
};

export type FormApi = ValidationState & {
  isDirty: boolean;
  isLoading: boolean;
  values: FormValues;
  touched: FieldsFlags;
  changed: FieldsFlags;
  Field: React.ComponentType;
  setValue: (field: string, val: any) => void;
  setValues: (values: FormValues) => void;
  reset: () => void;
};

export type FormValidationRule = {
  type?: string;
  check?: (
    value: any,
    schema: FormValidationSchema,
    values: FormValues
  ) => boolean;
  messages?: { [id: string]: string };
};

export type Props = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit' | 'onChange'
> & {
  className?: string;
  defaultValues?: FormValues;
  initialValues: FormValues;
  defaultDisabled?: FieldsFlags;
  validationSchema?: FormValidationSchema;
  markEdited?: boolean;
  children: (api: FormApi) => JSX.Element | JSX.Element[];
  onInit?: (api: FormApi) => boolean | void;
  onChange?: (values: FormValues) => void;
  onSubmit?: (values: FormValues) => Promise<void>;
};

export type FieldProps = {
  name: string;
  className?: string;
  onChange: (e: ChangeEvent, value: any) => void | boolean;
  onBlur;
  markEdited?: Props['markEdited'];
  value: any;
  isHidden: boolean;
  component?: (props: FormFieldProps) => ReactNode;
  children?: ReactNode;
};

export type FormFieldProps = FieldProps & {
  value: any;
  error: ValidationError;
  isChanged: boolean;
  isTouched: boolean;
  clearMargins: boolean;
  handleChange: (name: string, val: any) => void;
  handleBlur: (name: string) => void;
};
