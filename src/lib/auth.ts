import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    trustedOrigins: [process.env.APP_URL!],
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
                required: false,
                input: false
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
    }
});