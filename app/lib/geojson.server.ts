import fs from "fs";

import { Feature, FeatureCollection } from 'geojson'


export function getGeojson(fileRoute: string) {
  if (!fs.existsSync(fileRoute)) throw Error('File is missing')
  else {
    const file = fs
      .readFileSync(fileRoute, 'utf8')
    return JSON.parse(file) as FeatureCollection
  }
}

export function sortFeatureCollection(featureCollection: FeatureCollection, key: string) {
  return {
    ...featureCollection,
    // @ts-expect-error features always have properties
    features: featureCollection.features.sort((a: Feature, b: Feature) => a.properties[key] - b.properties[key])
  }
}
