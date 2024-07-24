import { Link } from "@remix-run/react"

export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Top area: Blocks */}
        <div className="flex justify-between gap-8 py-8 md:py-12">

          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-4 lg:max-w-xs">
            <div className="mb-2">
              {/* Logo */}
              <Link to="/" className="inline-flex text-blue-600 transition duration-150 ease-in-out" aria-label="Cruip">
                <div className="shrink-0 mr-4">
                  <img
                    src='/images/TransitChat-Logo.svg'
                    className="h-12 lg:hidden"
                    alt="TransitChat Logo"
                  />
                  <img
                    src='/images/TransitChat-Logo-Horizontal.svg'
                    className="h-12 md:h-16 lg:h-20 hidden lg:flex"
                    width={150}
                    height={200}
                    alt="TransitChat Logo"
                  />
                </div>
              </Link>
            </div>
          </div>

          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2 pr-12">
            <h6 className="text-sm text-slate-800 font-semibold mb-2">How it works</h6>
            <ul className="text-sm font-medium space-y-2">
              <li>
                <a href="/" className="text-slate-500 hover:text-blue-600 transition duration-150 ease-in-out">Home</a>
              </li>
              <li>
                <a href="/#about" className="text-slate-500 hover:text-blue-600 transition duration-150 ease-in-out">Overview</a>
              </li>
              <li>
                <a href="/#pricing" className="text-slate-500 hover:text-blue-600 transition duration-150 ease-in-out">Pricing</a>
              </li>
              <li>
                <a href="/request-demo" className="text-slate-500 hover:text-blue-600 transition duration-150 ease-in-out">Request Demo</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-6 md:py-8 border-t border-slate-200">

          {/* Social links */}

          {/* Copyrights note */}
          <div className="text-sm text-slate-500 mr-4">City Serv LLC. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
