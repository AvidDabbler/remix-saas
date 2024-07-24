import { Link } from "@remix-run/react";
import { ArrowRight } from "lucide-react";

import { Dropdown } from "~/components/dropdown";

import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className={`bg-white absolute w-full z-30`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="shrink-0 mr-4">
            <img
              src="/images/TransitChat-Logo.svg"
              className="h-12 lg:hidden"
              alt="TransitChat Logo"
            />
            <img
              src="/images/TransitChat-Logo-Horizontal.svg"
              className="h-12 md:h-16 lg:h-20 hidden lg:flex"
              width={150}
              height={200}
              alt="TransitChat Logo"
            />
          </Link>
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-start flex-wrap items-center">
              <li>
                <Link
                  to="/#pricing"
                  className="font-medium text-davyGray hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/#about"
                  className="font-medium text-davyGray hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://blog.transit.chat"
                  className="font-medium text-davyGray hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Blog
                </a>
              </li>
              <Dropdown title="Open Source">
                <li>
                  <a
                    href={"https://github.com/ioTransit/simple-transit-site"}
                    className="hover:bg-blue-200 font-medium text-sm text-gray-600 hover:text-gray-900 flex py-2 px-5 leading-tight"
                  >
                    Simple Transit Site
                  </a>
                </li>
                <li>
                  <Link
                    to="/gtfs-to-geojson"
                    className="hover:bg-blue-200 font-medium text-sm text-gray-600 hover:text-gray-900 flex py-2 px-5 leading-tight"
                  >
                    Gtfs to Geojson
                  </Link>
                </li>
              </Dropdown>
            </ul>
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <a
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-giantOrange px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </a>
              </li>
              <li>
                <Link
                  to="/request-demo"
                  className="btn-sm bg-giantOrange text-white flex items-center transition duration-150 ease-in-out group"
                >
                  Request Demo <ArrowRight className="w-6" />
                </Link>
              </li>
            </ul>
          </nav>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
