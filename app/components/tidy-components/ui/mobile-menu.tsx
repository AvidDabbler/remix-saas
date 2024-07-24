'use client'

import { Transition } from '@headlessui/react'
import { Link } from "@remix-run/react"
import { ArrowRight, MenuIcon, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      setMobileNavOpen(false)
    };
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false)
    };
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <div className="flex md:hidden">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        {mobileNavOpen ? <X /> : <MenuIcon />}
      </button>

      {/*Mobile navigation */}
      <div
        ref={mobileNav}
      >
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="px-5 py-2 flex flex-col gap-2 text-lg">
            <li>
              <Link to="/#pricing" className="flex font-medium hover:text-blue-600 py-2" onClick={() => setMobileNavOpen(false)}>Pricing</Link>
            </li>
            <li>
              <Link to="/#about" className="flex font-medium hover:text-blue-600 py-2" onClick={() => setMobileNavOpen(false)}>About</Link>
            </li>
            <li>
              <Link to="/blog" className="flex font-medium hover:text-blue-600 py-2" onClick={() => setMobileNavOpen(false)}>Blog</Link>
            </li>
            <li>
              <Link to="/signin" className="flex font-medium w-full hover:text-blue-600 py-2" onClick={() => setMobileNavOpen(false)}>Sign in</Link>
            </li>
            <li>
              <Link to="/request-demo" className="btn bg-giantOrange flex font-medium text-white py-2 group" onClick={() => setMobileNavOpen(false)}>
                Request Demo <ArrowRight className='w-6' />
              </Link>
            </li>
          </ul>
        </Transition>
      </div>
    </div>
  )
}

