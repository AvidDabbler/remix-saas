import PricingTables from './pricing-tables';

export default function Pricing() {
  return (
    <section id='pricing' className="relative">
      <div className="absolute inset-0 bg-orange-100 pointer-events-none -z-10 h-1/3 lg:h-2/3" aria-hidden="true"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-10 pb-12">
            <h2 className="h2 font-playfair-display">Find the right plan for your agency</h2>
            <div className='bg-white rounded-full drop-shadow py-2'>
              <h2 className='h2 text-center text-giantOrange '>Early Access Pricing</h2>
              <h3>Early access customers will be locked into their pricing</h3>
            </div>
          </div>
          <PricingTables />
        </div>
      </div>
    </section>
  )
}
