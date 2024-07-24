import { z } from "zod";

const server = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXT_PUBLIC_GHOST_URL: z.string(),
  NEXT_PUBLIC_GHOST_ADMIN_KEY: z.string(),
  NEXT_PUBLIC_GHOST_CONTENT_KEY: z.string(),
  NEXT_PUBLIC_HUBSPOT_API_KEY: z.string(),
  NEXT_PUBLIC_RECAPTCHA: z.string(),
  NEXT_PUBLIC_RECAPTCHA_PRIVATE: z.string(),
  MAPBOX_ACCESS_TOKEN: z.string(),
  STRIPE_TABLE_ID: z.string(),
  STRIPE_PUBLISHABLE_KEY: z.string(),
});

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_GHOST_URL: process.env.NEXT_PUBLIC_GHOST_URL,
  NEXT_PUBLIC_GHOST_ADMIN_KEY: process.env.NEXT_PUBLIC_GHOST_ADMIN_KEY,
  NEXT_PUBLIC_GHOST_CONTENT_KEY: process.env.NEXT_PUBLIC_GHOST_CONTENT_KEY,
  NEXT_PUBLIC_RECAPTCHA: process.env.NEXT_PUBLIC_RECAPTCHA,
  NEXT_PUBLIC_RECAPTCHA_PRIVATE: process.env.NEXT_PUBLIC_RECAPTCHA_PRIVATE,
  NEXT_PUBLIC_HUBSPOT_API_KEY: process.env.NEXT_PUBLIC_HUBSPOT_API_KEY,
  MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
  STRIPE_TABLE_ID: process.env.STRIPE_TABLE_ID,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
};

const env = server.parse(processEnv);

export { env };
