import express from 'express';
import cors from 'cors';
import { auth } from './lib/auth';
import { toNodeHandler } from "better-auth/node";
import { mealsRouter } from './modules/meals/meals.router';
import { providerRouter } from './modules/providers/provider.router';
import { categoryRoute } from './modules/categories/category.router';
import verifyRole, { UserRoles } from './middleware/authMiddleware';
import { cartRoute } from './modules/cart/cart.router';
import { addressRoute } from './modules/addresses/address.router';
import { orderRoute } from './modules/orders/order.router';
import { customersRoute } from './modules/customers/customers.router';
import { dashboardRouter } from './modules/dashboards/dashboards.router';

const app = express();
app.use(express.json());
const allowedOrigins = [process.env.APP_URL || "https://food-hub-server-one.vercel.app" || process.env.PROD_APP_URL].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            const isAllowed =
                allowedOrigins.includes(origin) ||
                /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
                /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

            if (isAllowed) {
                callback(null, true);
            } else {
                callback(new Error(`Origin ${origin} not allowed by CORS`));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
        exposedHeaders: ["Set-Cookie"],
    }),
);


app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/dashboards", dashboardRouter);

app.use("/api/providers", providerRouter);

app.use("/api/customers", customersRoute);

app.use("/api/orders", orderRoute);

app.use("/api/meals", mealsRouter);

app.use("/api/category", categoryRoute);

app.use("/api/cart", cartRoute);

app.use("/api/addresses", addressRoute);



app.get('/', (req, res) => {
    res.send(`Food Hub server is running on Port: ${process.env.PORT || 5000}`);
});

export default app;