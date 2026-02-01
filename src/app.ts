import express from 'express';
import cors from 'cors';
import { auth } from './lib/auth';
import { toNodeHandler } from "better-auth/node";
import { mealsRouter } from './modules/meals/meals.router';
import { providerRouter } from './modules/providers/provider.router';
import { categoryRoute } from './modules/categories/category.router';
import verifyRole, { UserRoles } from './middleware/authMiddleware';
import { cartRoute } from './modules/cart/cart.router';

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.APP_URL || 'http://localhost:3000',
    credentials: true,
}));


app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/admin", providerRouter);

app.use("/api/providers", providerRouter);

app.use("/api/orders", mealsRouter);

app.use("/api/meals", mealsRouter);

app.use("/api/category", categoryRoute);

app.use("/api/cart", cartRoute);



app.get('/', (req, res) => {
    res.send(`Food Hub server is running on Port: ${process.env.PORT || 5000}`);
});

export default app;