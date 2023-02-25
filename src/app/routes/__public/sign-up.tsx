import { Form, NavLink } from '@remix-run/react';
import React from 'react';
import { Button } from '~/app/components/Button';
import { InputField } from '~/app/components/FormFields';

const SignUp: React.FC = () => {
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
          Sign up for free
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Or{' '}
          <NavLink
            to="/sign-in"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            sign in to your account
          </NavLink>
        </p>
      </div>
      <Form method="post" className="mt-8 space-y-6">
        <div className="flex flex-col gap-2 -space-y-px">
          <InputField name="name" label="Full name" fullWidth />
          <InputField name="email" label="Email address" fullWidth />
          <InputField
            name="password"
            label="Password"
            type="password"
            fullWidth
          />
        </div>

        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
