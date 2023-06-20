import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import useUserStore from "@/stores/User.store";
import { useRouter } from "next/router";

export default function Header() {
  const products = [
    {
      name: "Calendar",
      href: "/calendar",
      icon: SquaresPlusIcon,
    },
    {
      name: "User",
      href: "/users",
      icon: SquaresPlusIcon,
    },
    {
      name: "Role",
      href: "/roles",
      icon: SquaresPlusIcon,
    },
    {
      name: "Event",
      href: "/events",
      icon: SquaresPlusIcon,
    },
    {
      name: "Committee",
      href: "/committees",
      icon: SquaresPlusIcon,
    },
  ];
  const setToken = useUserStore((state: any) => state.setToken);
  const router = useRouter();
  const loginPath = "/login";
  const remove = (event: any) => {
    setToken(null);
    router.push(loginPath);
  };

  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between my-6"
        aria-label="Global"
      >
        <div className="flex flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">KIT Manager</span>
            <Image
              className="w-12 rounded-lg"
              src="/kit-logo.png"
              alt=""
              width={32}
              height={32}
            />
          </Link>
        </div>
        <Popover.Group className="flex gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6">
              Member
              <ChevronDownIcon
                className="h-5 w-5 flex-none"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 overflow-hidden rounded-3xl bg-black shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg px-4 py-2 text-sm leading-6"
                    >
                      <div className="flex flex-none items-center justify-center rounded-lg">
                        <item.icon
                          className="h-6 w-6 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link href={item.href} className="block font-semibold">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                      </div>
                    </div>
                  ))}
                  <div className="group relative flex items-center gap-x-6 rounded-lg px-4 py-2 text-sm leading-6">
                    <div className="flex flex-none items-center justify-center rounded-lg">
                      <SquaresPlusIcon
                        className="h-6 w-6 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-auto">
                      <button onClick={remove} className="block font-semibold">
                        Đăng xuất
                        <span className="absolute inset-0" />
                      </button>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          {/* <a href="#" className="text-sm font-semibold leading-6">
            Features
          </a> */}
        </Popover.Group>
      </nav>
    </header>
  );
}
