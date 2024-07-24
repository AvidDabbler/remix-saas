import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, redirect, useFetcher, useActionData } from "@remix-run/react"
import axios from 'axios'
import { ArrowRight, } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
;
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { Combobox } from "~/components/select";
import { SelectContent, Select, SelectTrigger, SelectValue, SelectItem } from "~/components/ui/select";
import { gtfsFeeds, countries } from "~/config";
import { env } from "~/env.server";
import { createZipStream } from '~/lib/utils';

export const meta: MetaFunction = () => {
  return [
    { title: "GTFS to Geojson Download" },
  ]
}

export async function loader() {
  const { NEXT_PUBLIC_RECAPTCHA } = env;
  if (!NEXT_PUBLIC_RECAPTCHA) throw redirect('/')

  return json({ NEXT_PUBLIC_RECAPTCHA })
}

const gtfsToGeojsonFormId = "gtfs-to-geojson-form";
export const checkValidator = z.object({
  email: z
    .string()
    .min(5, { message: "Email is required" })
    .email("Must be a valid email"),
  name: z.string().min(3),
  country: z
    .string()
    .transform((data) =>
      z.object({ name: z.string(), id: z.string() }).parse(JSON.parse(data))
    ),
  region: z
    .string()
    .transform((data) =>
      z.object({ name: z.string(), id: z.string() }).parse(JSON.parse(data))
    ),
  updateSignup: z.enum(["on"]).optional(),
  verified: z.enum(["true"]),
  captcha: z.enum(["true"]),
  url: z.string().url(),
});

type CheckValidatorType = z.infer<typeof checkValidator>;

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const {
      url,
      email,
      name,
      agency,
      country,
      region
    } = z.object({
      url: z.string(), email: z.string(),
      name: z.string(),
      agency: z.string(),
      country: z.string(),
      region: z.string()
    }).parse(Object.fromEntries(formData));

    await axios.post(
      "https://hook.us1.make.com/gfs38jka9key0kg5es19t1299127stgr",
      {
        form: "gtfs to geojson",
        email,
        name,
        agency,
        country,
        region,
      }
    );

    const { Gtfs } = await require('gtfs-parser');
    const gtfs = new Gtfs(url);
    await gtfs.init();

    const stopsGeojson = await gtfs.stopsToGeojson();
    const tripsGeojson = await gtfs.tripsToGeojson();
    const routesGeojson = await gtfs.routesToGeojson();

    return json({ success: true as const, stopsGeojson, tripsGeojson, routesGeojson });
  } catch (error) {
    console.error(error);
    return json({ success: false as const, error });
  }
}

export default function GTFSToGeoJson() {
  const fetcher = useFetcher<typeof action>()
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const actionData = useActionData<typeof action>()
  const [_agencies, setAgencies] = useState<typeof gtfsFeeds | null>(null);
  const [agency, setAgency] = useState<typeof gtfsFeeds[0] | null>(null);

  /**
   * Handles the reCAPTCHA verification process.
   * @returns A promise that resolves with the reCAPTCHA token.
   */
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha("register");

    setCaptchaToken(token);
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  useEffect(() => {
    if (!actionData) return
    if (actionData?.success) {
      toast.success("Thanks for registering")
    } else {
      toast.error("Somthing went wrong")
    }
  }, [actionData])

  async function handleDownload() {
    if (!fetcher.data || !fetcher.data.success) return
    const blob = await createZipStream([{ data: fetcher.data?.stopsGeojson, fileName: 'stops.geojson' }, { data: fetcher.data.tripsGeojson, fileName: 'trips.geojson' }, { data: fetcher.data.routesGeojson, fileName: 'routes.geojson' }])    // const zip = new AdmZip();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'download.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const onSubmit: SubmitHandler<CheckValidatorType> = async (data) => {
    try {
      console.log(agency)
      if (!agency || !agency.name) return

      fetcher.submit({
        url: data.url,
        email: data.email,
        name: data.name,
        agency: agency.name,
        region: agency.region,
        country: agency.country
      }, {
        method: 'POST',
      });

    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }
  };

  const onCountryChange = (e: string) => {
    const country = countries.find(el => el.name === e)
    if (!country) return
    const feeds = gtfsFeeds.filter((feed) => feed.country === country.id);
    setAgencies(feeds);
  };

  const onAgencyChange = (e: typeof gtfsFeeds[0]) => {
    if (!e.name) {
      return;
    } else {
      setAgency(e);
      setValue("url", e.url);
    }
  };

  useEffect(() => {
    if (!actionData) return
    if (actionData?.success) {
      toast.success("Thanks for registering")
    } else {
      toast.error("Somthing went wrong")
    }
  }, [actionData])

  return (
    <div className='flex'>
      {/* Content */}
      <div className="w-full md:w-1/2">

        <div className="min-h-screen h-full flex flex-col justify-center">

          <div className="px-5 sm:px-6 py-8">
            <div className="w-full max-w-md mx-auto">

              <h1 className="h2 font-playfair-display text-slate-800 mb-12">{`Download your agency's Geojson`}</h1>

              {/* Form */}
              <Form
                id={gtfsToGeojsonFormId}
                className="inset-0 m-auto grid gap-4 w-full max-w-xl rounded-lg bg-gray-200 p-10 text-gray-700 "
                // @ts-expect-error idk what is going on
                onSubmit={handleSubmit(onSubmit)} // eslint-disable-line
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Name<span className="text-rose-500">*</span></label>
                    <input {...register("name")} name="name" className="form-input py-2 w-full" type="name" required />
                    {errors.name?.message &&
                      typeof errors.name?.message === "string" ? <p className="px-3 text-red-500">{errors.name?.message}</p> : null}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email<span className="text-rose-500">*</span></label>
                    <input {...register("email")} name="email" className="form-input py-2 w-full" type="email" required />
                    {errors.email?.message &&
                      typeof errors.email?.message === "string" ? <p className="px-3 text-red-500">{errors.email?.message}</p> : null}
                  </div>
                  <label className="block text-sm font-medium mb-1" htmlFor="country">Country<span className="text-rose-500">*</span></label>
                  <Select onValueChange={(e) => {
                    onCountryChange(e)
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an item" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((el, key) => <SelectItem key={key} value={el.name} >{el.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.country?.message &&
                    typeof errors.country?.message === "string" ? <p className="px-3 text-red-500">{errors.country?.message}</p> : null}
                  <label className="block text-sm font-medium mb-1" htmlFor="agency">Agency<span className="text-rose-500">*</span></label>
                  <Combobox
                    options={_agencies || []}
                    name="agency"
                    error={undefined}
                    onChange={(e) => {
                      onAgencyChange(e as typeof gtfsFeeds[0])
                    }}
                  />
                  {errors.agency?.message &&
                    typeof errors.agency?.message === "string" ? <p className="px-3 text-red-500">{errors.agency?.message}</p> : null}
                </div>
                {captchaToken ? (
                  <input type="hidden" name="captcha" value={captchaToken}></input>
                ) : null}
                <div className="mt-6">
                  <button disabled={!captchaToken ? true : false} className="btn-sm w-full items-center flex text-sm text-white bg-asparagus hover:bg-blue-700 group">
                    Submit <ArrowRight className='w-4' />
                  </button>
                </div>
                <div className="mt-5">
                  <label className="flex items-start">
                    <input name='verified' type="checkbox" className="form-checkbox mt-0.5" defaultChecked />
                    <span className="text-sm text-slate-500 ml-3">By filling out this form, I consent to the collection and use of my personal data.</span>
                  </label>
                </div>
                <div className="grid">
                  <p className="text-sm">This site is protected by reCAPTCHA and the Google</p>
                  <div>
                    <a className="text-sm text-blue-600 underline" href="https://policies.google.com/privacy">Privacy Policy</a>
                    {"  "}  <a className="text-sm text-blue-600 underline" href="https://policies.google.com/terms">Terms of Service</a>
                  </div>
                </div>

              </Form>

            </div>
          </div>

        </div>
      </div>

      {/* Right side */}
      <div className="w-1/2 bg-slate-900" aria-hidden="true">

        {/* Bg image */}
        <img className="opacity-10 w-full h-full object-cover" src='/images/train.jpg' width={760} height={900} alt="train background" />
      </div>
      {
        fetcher.data?.success ?
          <button className='btn bg-asparagus' type='button' onClick={() => handleDownload()}>Download Data 🎉</button> : null
      }
    </div>
  )
}
