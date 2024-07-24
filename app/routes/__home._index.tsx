import { Link } from "@remix-run/react";
import { ArrowRight } from "lucide-react";

import Cta from "~/components/tidy-components/cta";
import FeaturesBlocks from "~/components/tidy-components/features-blocks";
import FeaturesHome from "~/components/tidy-components/features-home";
import FeaturesHome02 from "~/components/tidy-components/features-home-02";
import Pricing from "~/components/tidy-components/pricing";

export function HeroHome() {
  return (
    <section className="relative overflow-x-hidden">
      <div
        className="absolute inset-0 bg-giantOrange pointer-events-none -z-10 [clip-path:polygon(0_0,_5760px_0,_5760px_calc(100%_-_352px),_0_100%)]"
        aria-hidden="true"
      ></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-20 md:pt-40 md:pb-44">
          <div className="max-w-xl mx-auto md:max-w-none md:flex md:items-center md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-16 md:space-y-0">
            <div
              className="text-center md:text-left md:min-w-[30rem]"
              data-aos="fade-right"
            >
              <h1 className="text-6xl font-bold text-slate-100 mb-4">
                Collaboration for better transit planning and customer service
              </h1>
              <h2 className="text-xl text-white mb-8">
                You should be able to read your rider’s complaints and
                collaborate without forgetting to click reply all. TransitChat
                stores all of your rider feedback and conversations without
                searching through email threads and forwarding conversations.
              </h2>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <div>
                  <Link
                    className="btn text-white bg-[#4d7c0f] hover:bg-slate-800 w-full group"
                    to="/request-demo"
                  >
                    Request Demo <ArrowRight className="w-6" />
                  </Link>
                </div>
                <div>
                  <Link
                    className="btn text-white bg-davyGray hover:bg-slate-800 w-full"
                    to="#0"
                  >
                    Explore Product
                  </Link>
                </div>
              </div>
            </div>
            <img src="/images/collab.svg" width={700} height={405} alt="iek" />
          </div>
        </div>
      </div>
    </section>
  );
}
export default function HomeIndex() {
  return (
    <div className="relative">
      <HeroHome />
      <FeaturesBlocks />
      <FeaturesHome />
      <FeaturesHome02 />
      <Pricing />
      <Cta />
    </div>
  );
}
