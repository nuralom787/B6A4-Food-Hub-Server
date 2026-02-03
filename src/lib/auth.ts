import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    trustedOrigins: [process.env.APP_URL || "http://localhost:5000", "http://localhost:3000"],
    baseURL: "http://localhost:5000",
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignInAfterSignUp: true,
        requireEmailVerification: false,
    },
    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "CUSTOMER",
                required: true,
                input: true
            },
            phone: {
                type: "string",
                required: false,
                input: true
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE",
                required: false,
            }
        }
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
    },
    advanced: {
        cookiePrefix: "better-auth",
        useSecureCookies: process.env.NODE_ENV === "production",
        crossSubDomainCookies: {
            enabled: false,
        },
        disableCSRFCheck: true
    },

});