import GoTriangle from "~/public-images/gotriangle-logo.png";
import GtfsGeojson from "~/public-images/gtfs-to-geojson-logo.svg";
import GtfsHtml from "~/public-images/gtfs-to-html-logo.svg";
import GtfsNode from "~/public-images/node-gtfs-logo.svg";
import TransitChatVert from "~/public-images/TransitChat-vert.png";
import TransitChat from "~/public-images/TransitChat.svg";


export const GoTriangleLogo = ({ className }: { className: string }) => (
  <img src={GoTriangle} alt="GoTriangle Logo" className={className} />
);

export const TransitChatVeritcalLogo = ({
  className,
}: {
  className: string;
}) => (
  <img src={TransitChatVert} alt="TransitChat Logo" className={className} />
);

export const GtfsHtmlLogo = ({ className }: { className: string }) => (
  <a href="https://gtfstohtml.com/">
    <img src={GtfsHtml} alt="Gtfs to Html logo" className={className} />
  </a>
);
export const GtfsGeojsonLogo = ({ className }: { className: string }) => (
  <a href="https://github.com/BlinkTagInc/gtfs-to-geojson">
    <img src={GtfsGeojson} alt="Gtfs geojson Logo" className={className} />
  </a>
);
export const GtfsNodeLogo = ({ className }: { className: string }) => (
  <a href="https://github.com/BlinkTagInc/node-gtfs">
    <img src={GtfsNode} alt="Gtfs Node Logo" className={className} />
  </a>
);
export const TransitChatLogo = ({ className }: { className: string }) => (
  <img src={TransitChat} alt="TransitChat Logo" className={className} />
);
