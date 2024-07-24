import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, json, redirect, useActionData } from "@remix-run/react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "react-toastify";
import { getValidatedFormData } from "remix-hook-form";
import { z } from "zod";
import * as zod from "zod";

import { env } from "~/env.server";
import { getRecaptchaScore } from "~/utils";

export const meta = () => [
  { title: "TransitChat - Let's make transit better" },
];

export const checkValidator = z.object({
  city: z.string().min(1, "Enter a city name"),
  agency: z.string().min(1, "Enter an agency"),
  email: z
    .string()
    .min(5, { message: "Email is required" })
    .email("Must be a valid email"),
  name: z.string().min(3),
  verified: z.string(),
  captcha: z.string(),
});

type FormData = zod.infer<typeof checkValidator>;

const resolver = zodResolver(checkValidator);

export function loader() {
  const { NEXT_PUBLIC_RECAPTCHA } = env;
  if (!NEXT_PUBLIC_RECAPTCHA) throw redirect("/");
  return json({ NEXT_PUBLIC_RECAPTCHA });
}

export async function action({ request }: ActionFunctionArgs) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    return json({ success: false, errors, defaultValues });
  }
  try {
    const token = data.captcha;
    const key = env.NEXT_PUBLIC_RECAPTCHA_PRIVATE;

    const recaptchaResult = await getRecaptchaScore(token, key);

    if (!recaptchaResult) {
      return null;
    }

    await axios.post(
      "https://hook.us1.make.com/gfs38jka9key0kg5es19t1299127stgr",
      {
        form: "request demo",
        ...data,
      },
    );
    return json({ success: true, data });
  } catch (error) {
    return json({ success: false, error });
  }
}

export default function RequestDemo() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (!actionData) return;
    if (actionData?.success) {
      toast.success("Thanks for registering");
    } else {
      toast.error("Somthing went wrong");
    }
  }, [actionData]);

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

  return (
    <div className="flex">
      {/* Content */}
      <div className="w-full md:w-1/2">
        <div className="min-h-screen h-full flex flex-col justify-center">
          <div className="px-5 sm:px-6 py-8">
            <div className="w-full max-w-md mx-auto">
              <h1 className="h2 font-playfair-display text-slate-800 pt-10 mb-3">
                Request your demo
              </h1>

              <h2 className="font-playfair-display text-slate-800 mb-12 text-xl">
                Signup for TransitChat today and get 90 days on us. We are
                looking forward to connecting with all of our fans in the
                transit space and will have someone reach out once we get your
                info.
              </h2>
              {/* Form */}
              <Form method="post">
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="email"
                      className="form-input py-2 w-full"
                      type="email"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Contact Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="name"
                      className="form-input py-2 w-full"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="city"
                    >
                      City <span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="city"
                      className="form-input py-2 w-full"
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="agency"
                    >
                      Agency<span className="text-rose-500">*</span>
                    </label>
                    <input
                      name="agency"
                      className="form-input py-2 w-full"
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    className="btn-sm w-full items-center flex text-sm text-white bg-asparagus hover:bg-blue-700 group"
                    disabled={!captchaToken ? true : false}
                  >
                    Submit <ArrowRight className="w-4" />
                  </button>
                </div>
                <div className="mt-5">
                  <label className="flex items-start">
                    <input
                      name="verified"
                      type="checkbox"
                      className="form-checkbox mt-0.5"
                      defaultChecked
                    />
                    <span className="text-sm text-slate-500 ml-3">
                      By filling out this form, I consent to the collection and
                      use of my personal data.
                    </span>
                  </label>
                </div>
                {captchaToken ? (
                  <input
                    type="hidden"
                    name="captcha"
                    value={captchaToken}
                  ></input>
                ) : null}
                <div className="grid">
                  <p className="text-sm">
                    This site is protected by reCAPTCHA and the Google
                  </p>
                  <div>
                    <a
                      className="text-sm text-blue-600 underline"
                      href="https://policies.google.com/privacy"
                    >
                      Privacy Policy
                    </a>
                    {"  "}{" "}
                    <a
                      className="text-sm text-blue-600 underline"
                      href="https://policies.google.com/terms"
                    >
                      Terms of Service
                    </a>
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
        <img
          className="opacity-10 w-full h-full object-cover"
          src="/images/train.jpg"
          width={760}
          height={900}
          alt="train background"
        />
      </div>
    </div>
  );
}
