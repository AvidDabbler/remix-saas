import { LinksFunction, json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { FeatureCollection, Point, Feature } from 'geojson';
import mapboxCss from "mapbox-gl/dist/mapbox-gl.css";
import { ReactNode, useEffect, useState } from 'react';
import Mapbox, { CircleLayer, Layer, MapProvider, MapRef, Source, useMap } from 'react-map-gl';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { env } from '~/env.server';
import { TransitChatLogo } from '~/images';
import { getGeojson } from '~/lib/geojson.server';


export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: mapboxCss }];
};

export function loader() {
  const uzaGeojson = getGeojson('2024-fta-funding/uza_totals_points.geojson');
  const statesGeojson = getGeojson('2024-fta-funding/state_totals_points.geojson');
  return json({
    uzaGeojson: uzaGeojson as FeatureCollection<Point>,
    statesGeojson: statesGeojson as FeatureCollection<Point>,
    mapboxAccessToken: env.MAPBOX_ACCESS_TOKEN
  })
}

const uzacalc = ['/', ['get', 'total_invest'], ['get', 'total_pop']]
const uzas: CircleLayer = {
  id: 'uzas',
  type: 'circle',
  paint: {
    'circle-radius': [
      'interpolate',
      ['linear'],
      uzacalc,
      0, 2,  // Lower bound: red color
      1, 5,
      3, 8,
      5, 9,
      10, 10,
    ],

    'circle-color': [
      'interpolate',
      ['linear'],
      uzacalc,
      0, 'red',  // Lower bound: red color
      1, 'orange',  // Orange color
      3, 'yellow',  // Yellow color
      5, 'lightgreen',  // Light Green color
      10, 'darkgreen'  // Dark Green color    ],
    ],
  }
};

const stateCalc = ['/', ['get', 'total_invest'], ['get', 'total_pop']]
const states: CircleLayer = {
  id: 'states',
  type: 'circle',
  maxzoom: 8,
  paint: {
    'circle-stroke-width': 1,
    'circle-stroke-color': 'black',
    'circle-radius': [
      'interpolate',
      ['linear'],
      stateCalc,
      0, 2,  // Lower bound: red color
      10, 10,
      20, 20,
      30, 30,
      80, 40,
    ],
    'circle-color': [
      'interpolate',
      ['linear'],
      stateCalc,
      0, 'red',  // Lower bound: red color
      10, 'orange',  // Orange color
      20, 'yellow',  // Yellow color
      30, 'lightgreen',  // Light Green color
      80, 'darkgreen'  // Dark Green color    ],
    ]
  }
};

export default function FtaFundingPage() {
  const loaderData = useLoaderData<typeof loader>()
  const [feature, setFeature] = useState<null | Feature<Point>>(null)



  const updateFeature = (map: MapRef | undefined, zoom: number, feature: Feature<Point>) => {
    if (map) {
      setFeature(feature)
      map?.easeTo({
        center: feature.geometry?.coordinates as [number, number],//: [0, 0],
        zoom,
        duration: 2000,
      })
    }
  }

  function formatNumber(x: number) {
    return x.toLocaleString('en', { useGrouping: true });
  }


  return (
    <div className='flex w-full h-full'>
      <MapProvider>
        <div className='bg-white w-[400px] h-screen flex flex-col'>
          <Tabs defaultValue='states'>
            <TabsList className='w-full'>
              <TabsTrigger value="states">States</TabsTrigger>
              <TabsTrigger value="uzas">Urban Areas</TabsTrigger>
            </TabsList>
            <div className='w-full h-screen grid overflow-y-auto'>
              <ul className='flex flex-col h-full'>
                <TabsContent value='states'>
                  {
                    loaderData.statesGeojson.features.map((el, i) => <SideButton key={i} onClick={(map) => updateFeature(map, 7, el)}><li >{el.properties?.NAME}</li></SideButton>)
                  }
                </TabsContent>
                <TabsContent value='uzas'>
                  {
                    loaderData.uzaGeojson.features.map((el, i) => <SideButton key={i} onClick={(map) => updateFeature(map, 9, el)}><li >{el.properties?.UZA_NAME}</li></SideButton>)
                  }
                </TabsContent>
              </ul>
            </div>
          </Tabs>
        </div>
        <div className='w-full h-full flex'>
          <div className='z-10 flex gap-3 flex-col  bg-white rounded-md px-3 py-2 absolute text-xl font-bold top-6 mx-6'>
            <div className='flex gap-2 sm:flex-6 flex-col sm:flex-row '>
              <Link to='/' className=''>
                <TransitChatLogo className='h-[50px]' />
              </Link>
              <a href='https://www.transit.dot.gov/about/news/biden-harris-administration-announces-nearly-4-billion-support-14-major-transit'>
                <img src='images/fta.png' alt='fta logo' width={150} />
              </a>
            </div>
            <h1 className=''>
              $4 Billion dollars invested in transit
            </h1>
          </div>
          <Mapbox id='map' mapboxAccessToken={loaderData.mapboxAccessToken} initialViewState={{
            bounds: [[-185.80, 72.76], [-34.45, 1.58]],
          }}
            mapStyle="mapbox://styles/mapbox/streets-v9">
            <Source type="geojson" data={loaderData.uzaGeojson}>
              <Layer {...uzas} />
            </Source>
            <Source type="geojson" data={loaderData.statesGeojson}>
              <Layer {...states} />
            </Source>
          </Mapbox>
        </div>
        {
          feature ? <div className='absolute right-6 bottom-6 bg-white rounded-lg px-3 py-2'>
            <h2>{feature.properties?.NAME}</h2>
            <p>{`Total Investment: $${formatNumber(feature.properties?.total_invest)}`}</p>
            <p>{`Total Population: ${formatNumber(feature.properties?.total_pop)}`}</p>
            <p>{`Total Per Capita: $${Math.floor((feature.properties?.total_invest / feature.properties?.total_pop) * 100) / 100}`}</p>
          </div> : null
        }
        <MapClick setFeature={setFeature} />
      </MapProvider >
    </div >)
}

function MapClick({ setFeature }: { setFeature: (feature: Feature<Point>) => void; }) {
  const { map } = useMap();

  useEffect(() => {
    if (map) {
      map.once('load', () => {
        map.on('click', ['states', 'uzas'], (event) => {
          event.preventDefault()
          if (event.features && event.features[0]) setFeature(event.features[0] as Feature<Point>)
        })
      })
    }
  }, [map, setFeature])
  return null
}


function SideButton({ children, onClick }: { children: ReactNode, onClick: (map: MapRef | undefined) => void; }) {
  const { map } = useMap();
  return (
    <button className='w-full py-1 px-3 text-left hover:bg-blue-200' onClick={() => onClick(map)}>
      {children}
    </button>
  )
}
