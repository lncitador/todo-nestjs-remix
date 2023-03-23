import { ActionFunction, MetaFunction } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
// import { Form, useActionData } from '@remix-run/react';
import { wireAction } from 'nest-remix/core.server';
import React, { Fragment } from 'react';
import { z } from 'zod';
import { Form } from '~/app/components/Form';
import { UserSchema } from '~/libs/zod';

import { SignInBackend } from '~/modules/authenticator/server/sign-in.server';

export const action: ActionFunction = (args) => wireAction(SignInBackend, args);

export const meta: MetaFunction = () => {
  return {
    title: 'Sign in',
  };
};

const login = UserSchema.pick({
  email: true,
  password: true,
}).extend({
  remembeMe: z.boolean(),
});

const Login: React.FC = () => {
  const data = useActionData<SignInBackend['createSession']>();

  return (
    <div className="w-full max-w-sm space-y-6">
      <div>
        <hgroup className="flex flex-col items-center justify-center mt-[-2rem] ">
          <img
            className="h-20"
            src="https://avatars.githubusercontent.com/u/60629982?s=400&u=87b71f1227797d533f85fd772c4de3aa42a35b48&v=4"
            alt="Pyxis Logo"
          />
          <h1 className="mt-2 text-2xl">CETUS-APP</h1>
        </hgroup>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-gray-400">
          Sign in to your account
        </h2>
      </div>
      <Form
        schema={login}
        className="flex flex-col gap-1 mt-8"
        method="post"
        buttonLabel="Sign in"
      >
        {({ Field, Button, Errors }) => (
          <Fragment>
            <Field
              name="email"
              label=""
              placeholder="Email address"
              type="email"
            />
            <Field
              name="password"
              label=""
              type="password"
              placeholder="Password"
            />
            <div className="flex flex-col gap-2 mt-6">
              <div className="flex items-center justify-between">
                <Field name="remembeMe" label="Remember me">
                  {({ Checkbox, Label }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox />
                      <Label />
                    </div>
                  )}
                </Field>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-sky-600 hover:text-sky-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <Button className="w-full" />
            </div>
            <Errors />
          </Fragment>
        )}
      </Form>
    </div>
  );
};

export default Login;
