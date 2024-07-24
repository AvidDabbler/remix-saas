import { ClipboardPen, FileStack, MailCheck, Map, MapPin, ThumbsUp } from 'lucide-react'
export default function FeaturesBlocks() {
  return (
    <div id="about" className="max-w-[900px] mx-auto px-4 sm:px-6">
      <div className="py-12 md:py-20 flex flex-wrap">

        {/* Items */}
        <div className="relative max-w-sm mx-auto grid gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-20 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>

          {/* 1st item */}
          <div className="relative grid gap-2" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
            <div className="bg-asparagus text-white flex items-center justify-center rounded-full h-16 w-16">
              <ClipboardPen className="text-5xl" size={30} />
            </div>
            <h3 className="h4 font-playfair-display">Issue Tracking and Conversations</h3>
            <p className="text-lg text-blue-900">Your conversations and the the details of the issue are stored in one place open for teams to see. No email forwarding</p>
          </div>

          <div className="relative grid gap-2" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
            <div className="bg-asparagus text-white flex items-center justify-center rounded-full h-16 w-16">
              <Map className="text-5xl" size={30} />
            </div>
            <h3 className="h4 font-playfair-display">Real-time vechicle mapping</h3>
            <p className="text-lg text-blue-900">Simple mapping for customer service with vehcile and on-time performance updates. No more switching between programs.</p>
          </div>

          <div className="relative grid gap-2" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
            <div className="bg-asparagus text-white flex items-center justify-center rounded-full h-16 w-16">
              <MailCheck className="text-5xl" size={30} />
            </div>
            <h3 className="h4 font-playfair-display">Simple Email Updates</h3>
            <p className="text-lg text-blue-900">We send out email updates to users with breakdowns of issues and accomplishments. Staying up to date without meetings.</p>
          </div>

          <div className="relative grid gap-2" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
            <div className="bg-asparagus text-white flex items-center justify-center rounded-full h-16 w-16">
              <MapPin className="text-5xl" size={30} />
            </div>
            <h3 className="h4 font-playfair-display">Tag Conversations with Locations</h3>
            <p className="text-lg text-blue-900">Keeping track of where issues occoured is stored on the issue. Knowing where issues are side by side with the issue.</p>
          </div>

          <div className="relative grid gap-2" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
            <div className="bg-asparagus text-white flex items-center justify-center rounded-full h-16 w-16">
              <FileStack className="text-5xl" size={30} />
            </div>
            <h3 className="h4 font-playfair-display">Group Issues by Route and Trips</h3>
            <p className="text-lg text-blue-900">Filter and group issues by routes help you prioritize schedule updates. Schdule updates have never been easier.</p>
          </div>

          <div className="relative grid gap-2" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
            <div className="bg-asparagus text-white flex items-center justify-center rounded-full h-16 w-16">
              <ThumbsUp className="text-5xl" size={30} />
            </div>
            <h3 className="h4 font-playfair-display">No Other System Required</h3>
            <p className="text-lg text-blue-900">TransitChat is a stand alone product all agencies need is a GTFS to get started. No advanced contracts or agreements.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
