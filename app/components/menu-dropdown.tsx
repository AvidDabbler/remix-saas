import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, type ReactNode } from "react";

export const MenuDropdown = ({
  icon,
  linksList,
}: {
  icon: ReactNode;
  linksList: { url: string; name: string }[];
}) => {
  return (
    <Menu>
      <Menu.Button>{icon}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-6 mt-10 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
          <div className="grid">
            {linksList.map((link, i) => (
              <Menu.Item key={i}>
                {({ active }) => (
                  <a
                    className={clsx(active && "bg-blue-300", "p-3")}
                    href={link.url}
                  >
                    {link.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
