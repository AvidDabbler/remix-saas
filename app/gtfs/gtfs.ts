// import { importGtfs } from "gtfs";
// import gtfsToGeoJSON from "gtfs-to-geojson";
// import gtfsToHtml from "gtfs-to-html";

import { gtfsConfig } from "../config.server";

function dynamicImport(moduleName: string) {
  if (typeof require !== "undefined" && require.resolve) {
    try {
      if (require.resolve(moduleName)) {
        return Promise.resolve(require(moduleName));
      }
    } catch (error) {
      // Handle cases where the module can't be loaded via require
    }
  }

  // Fallback to import if require fails or isn't available
  return import(moduleName);
}

export async function load() {
  let { importGtfs } = await import("gtfs");
  // @ts-expect-error any
  let gtfsToHtml = await import("gtfs-to-html");
  // @ts-expect-error any
  let gtfsToGeoJSON = await import("gtfs-to-geojson");

  try {
    importGtfs(gtfsConfig)
      .then(() => {
        console.log("Imported gtfs");
        gtfsToHtml(gtfsConfig);
      })
      .then(() => {
        console.log("HTML Generation Successful");
        gtfsToGeoJSON(gtfsConfig);
      })
      .then(() => {
        console.log("gtfs to geojson Successful");
        process.exit();
      })
      .catch((err: unknown) => {
        console.error(err);
        process.exit(1);
      });
  } catch (error) {
    console.error(error);
  }
}
