import {
  Form as FrameworkForm,
  useSubmit,
  useTransition as useNavigation,
} from '@remix-run/react';
import {
  createForm,
  createFormAction,
  FormProps,
  FormSchema,
} from 'remix-forms';
import {
  redirect,
  typedjson as json,
  useTypedActionData as useActionData,
} from 'remix-typedjson';

import { Button } from '../Button';
import { Input } from './Input';
import { Label } from './Label';
import { TextArea } from './TextArea';
import { Select } from './Select';
import { Error } from './Error';
import { CheckBox } from './CheckBox';

type Props<T extends FormSchema> = Omit<
  FormProps<T>,
  | 'buttonComponent'
  | 'labelComponent'
  | 'inputComponent'
  | 'checkboxComponent'
  | 'multilineComponent'
  | 'selectComponent'
  | 'radioComponent'
>;

const formAction = createFormAction({ redirect, json });
const FormElement = createForm({
  component: FrameworkForm,
  useNavigation,
  useSubmit,
  useActionData,
});

const Form = <Schema extends FormSchema>(props: Props<Schema>) => (
  <FormElement
    {...props}
    buttonComponent={Button}
    labelComponent={Label}
    inputComponent={Input}
    buttonLabel={props.buttonLabel || 'Submit'}
    multilineComponent={TextArea}
    selectComponent={Select}
    checkboxComponent={CheckBox}
    radioComponent={Input}
    errorComponent={Error}
  />
);

export { formAction, Form };
