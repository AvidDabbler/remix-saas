import { Link } from "@remix-run/react"

import { Icon } from "./icon"

export const Footer = () => {
  return (<footer className="w-full bg-gray-50">
    <div className="mx-auto max-w-7xl py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav className="-mx-5 -my-2 flex justify-between">
        <div className="justify-between px-5 py-2 w-full pr-20 lg:w-5/6 flex items-center">
          <img
            src='/images/TransitChat-Logo-Horizontal.svg'
            className="h-12 md:h-16 lg:h-20"
            width={200}
            height={200}
            alt="TransitChat Logo"
          />
          <Link
            to="/"
            className="text-base text-gray-500 hover:text-tcOrange"
          >
            Home
          </Link>
          <Link to="#About" className="text-base text-gray-500 hover:text-tcOrange">
            About
          </Link>
          <Link to="https://blog.transit.chat" className="text-base text-gray-500 hover:text-tcOrange">
            Blog
          </Link>
          <div className="grid px-5 py-2 mr-20 sm:mr-0">
            <Link to='https://www.linkedin.com/company/transit-chat'>
              <Icon id='ri-linkedin-box-fill' className='text-gray-500 text-3xl hover:text-tcOrange' />
            </Link>
          </div>
        </div>
      </nav>
    </div>

  </footer>)
}
