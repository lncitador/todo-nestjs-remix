import { ActionFunction, MetaFunction } from '@remix-run/node';
import { Form, NavLink, useActionData } from '@remix-run/react';
import { wireAction } from 'nest-remix/core.server';
import React from 'react';
import { Button } from '~/app/components/Button';
import { CheckboxField, InputField } from '~/app/components/FormFields';
import { getValidationError } from '~/app/utils/validation-error';
import { SignInBackend } from '~/modules/authenticator/server/sign-in.server';

export const action: ActionFunction = (args) => wireAction(SignInBackend, args);

export const meta: MetaFunction = () => {
  return {
    title: 'Sign in',
  };
};

const string: React.FC = () => {
  const data = useActionData<SignInBackend['createSession']>();

  return (
    <div className="w-full max-w-sm space-y-8">
      <div>
        <hgroup className="flex flex-col items-center justify-center mt-[-2rem] ">
          <img
            className="h-20"
            src="https://avatars.githubusercontent.com/u/60629982?s=400&u=87b71f1227797d533f85fd772c4de3aa42a35b48&v=4"
            alt="Your Company"
          />
          <h1 className="mt-2 text-2xl">TO-DO LIST</h1>
        </hgroup>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-gray-400">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Or{' '}
          <NavLink
            to="/sign-up"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            sign up for free
          </NavLink>
        </p>
      </div>
      <Form method="post" className="mt-8 space-y-6">
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="flex flex-col gap-2 -space-y-px">
          <InputField
            name="email"
            label="Email address"
            fullWidth
            error={getValidationError('email', data?.errors)}
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            fullWidth
            error={getValidationError('password', data?.errors)}
          />
        </div>

        <div className="flex items-center justify-between">
          <CheckboxField name="remember" label="Remember me" />

          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </Form>
    </div>
  );
};

export default string;
