
import { type ClassValue, clsx } from "clsx";
import JsZip from 'jszip'
import { twMerge } from "tailwind-merge";

import { region, timezone } from "~/config.server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDow(date: Date) {
  const options = { timeZone: timezone, weekday: "long" };
  // @ts-expect-error times suck
  const dayOfWeek = date.toLocaleDateString(region, options);
  // Options for the formatted date
  const formattedDateOptions = {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = date.toLocaleDateString(
    "en-US",
    // @ts-expect-error dates are hard
    formattedDateOptions,
  ) as string;
  const _date = new Date(formattedDate);

  return { dow: dayOfWeek, formattedDate: cleanDate(_date) };
}
const addPadding = (number: number) =>
  number < 10 ? `0${number}` : number.toString();

export const cleanDate = (date: Date) => {
  const month = addPadding(date.getMonth() + 1);
  const day = addPadding(date.getDate());
  const dateString = `${date.getFullYear()}${month}${day}`;
  return parseInt(dateString);
};

export const getService = (serviceIds: string[], dow: string) => {
  switch (dow) {
    case "Saturday":
      return serviceIds.includes("sat")
        ? "sat"
        : serviceIds.includes("mon-fri")
          ? "mon-fri"
          : serviceIds[0];
    case "Sunday":
      return serviceIds.includes("sun")
        ? "sun"
        : serviceIds.includes("mon-fri")
          ? "mon-fri"
          : serviceIds[0];
    default:
      return serviceIds.includes("mon-fri") ? "mon-fri" : serviceIds[0];
  }
};

type JsonObject = Record<string, any>; // eslint-disable-line

type FileDownlodResp = { success: false } | { success: true, data: { data: JsonObject, fileName: string }[] }
export async function handleDownload(formData: FormData, postUrl: string) {
  const response = await fetch(postUrl, {
    method: 'POST',
    body: formData,
  });

  const json: FileDownlodResp = await response.json();

  if (json.success) {
    json.data.forEach(el => {
      const blob = new Blob([JSON.stringify(el.data)])
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = el.fileName
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
  }
}


interface JsonWithFileName {
  data: JsonObject;
  fileName: string;
}

export async function createZipStream(jsonArray: JsonWithFileName[]) {

  // Create a new instance of AdmZip
  const z = new JsZip();

  // Convert each JSON object to a string and add it to the zip file
  jsonArray.forEach(({ data, fileName }) => {
    const jsonString = JSON.stringify(data, null, 2); // 2-space indentation for pretty formatting
    z.file(fileName, jsonString);
  });

  const zipBlob = await z.generateAsync({ type: 'blob' })

  return zipBlob
}

