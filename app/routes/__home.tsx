import { LinksFunction } from '@remix-run/node'
import { Outlet } from "@remix-run/react"

import Footer from '~/components/tidy-components/ui/footer';
import { Header } from '~/components/tidy-components/ui/header';
import rangeSlider from '~/styles/range-slider.css'
import theme from '~/styles/theme.css'
import toggleSwitch from '~/styles/toggle-switch.css'
import utilityPattern from '~/styles/utility-patterns.css'


export default function HomeIndex() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: rangeSlider },
  { rel: "stylesheet", href: theme },
  { rel: "stylesheet", href: toggleSwitch },
  { rel: "stylesheet", href: utilityPattern },
];




