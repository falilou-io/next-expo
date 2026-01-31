import { expo } from "@better-auth/expo";
import { db } from "@minimal/db";
import * as schema from "@minimal/db/schema/auth";
import { env } from "@minimal/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",

    schema: schema,
  }),
  trustedOrigins: [env.CORS_ORIGIN, "mybettertapp://", "exp://"],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies(), expo()],
});
