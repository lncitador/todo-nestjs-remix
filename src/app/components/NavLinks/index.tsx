import { RadioGroup } from '@headlessui/react';
import { useLocation, useNavigate } from '@remix-run/react';
import { links } from '~/app/utils/links';

export const NavLinks: React.FC = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  function handleChange(pathname: string) {
    navigate({
      pathname,
      search,
    });
  }

  return (
    <ul className="grid gap-2">
      <RadioGroup value={pathname} onChange={handleChange}>
        <RadioGroup.Label className="sr-only">Navigation</RadioGroup.Label>
        <li className="space-y-1">
          {links.map((link) => (
            <RadioGroup.Option
              key={link.path}
              value={link.path}
              className={({ checked }) => `
                    ${
                      checked
                        ? 'bg-sky-100 dark:bg-slate-700/[.2] text-rose-600 dark:text-slate-200'
                        : 'text-gray-600 dark:text-slate-400'
                    }
                    relative px-4 py-2 cursor-pointer flex focus:outline-none
                `}
            >
              {({ checked }) => (
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <RadioGroup.Label
                        as="p"
                        className="transition hover:text-rose-600 dark:hover:text-slate-200"
                      >
                        {link.name}
                      </RadioGroup.Label>
                    </div>
                    <div
                      className={`${
                        checked
                          ? 'border-rose-500 dark:border-slate-200 border-r-4'
                          : 'border-transparent'
                      } absolute -inset-px pointer-events-none`}
                      aria-hidden="true"
                    />
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </li>
      </RadioGroup>
    </ul>
  );
};
