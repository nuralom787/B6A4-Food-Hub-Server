// src/app.ts
import express from "express";
import cors from "cors";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider      = "prisma-client"\n  output        = "../generated/prisma"\n  binaryTargets = ["native", "rhel-openssl-1.0.x"]\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id        String   @id\n  name      String\n  email     String\n  image     String?\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  role      String?  @default("CUSTOMER")\n  phone     String?\n  status    String?  @default("ACTIVE")\n  cart      Cart?\n\n  providerProfile ProviderProfile?\n  emailVerified   Boolean          @default(false)\n  orders          Order[]\n  reviews         Review[]\n  sessions        Session[]\n  accounts        Account[]\n  addresses       Address[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nenum Role {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  SUSPENDED\n}\n\nmodel ProviderProfile {\n  id     String @id @default(uuid())\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  businessName String\n  address      String\n  description  String?\n  imageUrl     String?\n\n  meals Meal[]\n}\n\nmodel Category {\n  id    String @id @default(uuid())\n  name  String @unique\n  meals Meal[]\n}\n\nmodel Meal {\n  id          String  @id @default(uuid())\n  title       String\n  description String\n  price       Float\n  imageUrl    String?\n  isAvailable Boolean @default(true)\n\n  providerId String\n  provider   ProviderProfile @relation(fields: [providerId], references: [id], onDelete: Cascade)\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n\n  orderItems OrderItem[]\n  cartItems  CartItem[]\n  reviews    Review[]\n}\n\nmodel Order {\n  id              String      @id @default(uuid())\n  totalAmount     Float\n  deliveryAddress String\n  status          OrderStatus @default(PENDING)\n  paymentMethod   String      @default("Cash on Delivery")\n\n  customerId String\n  customer   User   @relation(fields: [customerId], references: [id])\n\n  orderItems OrderItem[]\n  createdAt  DateTime    @default(now())\n  updatedAt  DateTime    @updatedAt\n}\n\nenum OrderStatus {\n  PENDING\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nmodel OrderItem {\n  id       String @id @default(uuid())\n  quantity Int\n  price    Float\n\n  orderId String\n  order   Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)\n\n  mealId String\n  meal   Meal   @relation(fields: [mealId], references: [id])\n}\n\nmodel Review {\n  id      String  @id @default(uuid())\n  rating  Int\n  comment String?\n\n  customerId String\n  customer   User   @relation(fields: [customerId], references: [id])\n\n  mealId String\n  meal   Meal   @relation(fields: [mealId], references: [id])\n\n  createdAt DateTime @default(now())\n}\n\nmodel Address {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  addressLine String\n  city        String\n  area        String?\n  isDefault   Boolean @default(false)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("addresses")\n}\n\nmodel Cart {\n  id        String     @id @default(uuid())\n  userId    String     @unique\n  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)\n  items     CartItem[]\n  createdAt DateTime   @default(now())\n  updatedAt DateTime   @updatedAt\n\n  @@map("carts")\n}\n\nmodel CartItem {\n  id       String  @id @default(uuid())\n  title    String\n  imageUrl String?\n  price    Float\n  quantity Int     @default(1)\n\n  cartId String\n  cart   Cart   @relation(fields: [cartId], references: [id], onDelete: Cascade)\n\n  mealId String\n  meal   Meal   @relation(fields: [mealId], references: [id])\n\n  @@unique([cartId, mealId])\n  @@map("cart_items")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToUser"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"addresses","kind":"object","type":"Address","relationName":"AddressToUser"}],"dbName":"user"},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"businessName","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":null},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToMeal"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"deliveryAddress","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"paymentMethod","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Address":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AddressToUser"},{"name":"addressLine","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"area","kind":"scalar","type":"String"},{"name":"isDefault","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"addresses"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CartToUser"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"carts"},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"CartItemToMeal"}],"dbName":"cart_items"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  trustedOrigins: ["https://food-hub-client-eight.vercel.app"],
  baseURL: "https://food-hub-server-one.vercel.app",
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: {
    enabled: true,
    autoSignInAfterSignUp: true,
    requireEmailVerification: false
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
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
        required: false
      }
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
  }
});

// src/app.ts
import { toNodeHandler } from "better-auth/node";

// src/modules/meals/meals.router.ts
import { Router } from "express";

// src/modules/meals/meals.service.ts
var createMeals = async (data) => {
  const result = await prisma.meal.create({
    data: {
      ...data
    }
  });
  return result;
};
var getAllMeals = async (payload) => {
  const meals = await prisma.meal.findMany({
    where: {
      ...payload
    }
  });
  return { meals, total: meals.length };
};
var getSingleMeal = async (mealId) => {
  const meal = await prisma.meal.findFirstOrThrow({
    where: {
      id: mealId
    },
    include: {
      category: true,
      provider: true,
      reviews: true,
      orderItems: true
    }
  });
  return { meal };
};
var mealsService = {
  createMeals,
  getAllMeals,
  getSingleMeal
};

// src/modules/meals/meals.controller.ts
var createMeals2 = async (req, res) => {
  try {
    console.log(req.body);
    const result = await mealsService.createMeals(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Meal" });
  }
};
var getAllMeals2 = async (req, res) => {
  try {
    const result = await mealsService.getAllMeals(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
var getSingleMeals = async (req, res) => {
  try {
    const result = await mealsService.getSingleMeal(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
var mealsController = {
  createMeals: createMeals2,
  getAllMeals: getAllMeals2,
  getSingleMeals
};

// src/modules/meals/meals.router.ts
var router = Router();
router.get("/", mealsController.getAllMeals);
router.get("/:id", mealsController.getSingleMeals);
router.post("/", mealsController.createMeals);
var mealsRouter = router;

// src/modules/providers/provider.router.ts
import { Router as Router2 } from "express";

// src/modules/providers/provider.service.ts
var getProviderProfile = async (id) => {
  try {
    const result = await prisma.providerProfile.findUnique({
      where: {
        userId: id
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
};
var getSingleProvider = async (id) => {
  try {
    const result = await prisma.providerProfile.findUnique({
      where: {
        id
      },
      include: {
        meals: true
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
};
var createProviderProfile = async (data) => {
  try {
    const result = await prisma.providerProfile.create({
      data
    });
    return result;
  } catch (err) {
    throw err;
  }
};
var providerService = {
  getProviderProfile,
  getSingleProvider,
  createProviderProfile
};

// src/modules/providers/provider.controller.ts
var getProviderProfile2 = async (req, res) => {
  try {
    const id = req.query.id;
    const result = await providerService.getProviderProfile(id);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};
var getSingleProvider2 = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await providerService.getSingleProvider(id);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};
var createProviderProfile2 = async (req, res) => {
  try {
    const body = req.body;
    const result = await providerService.createProviderProfile(body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};
var providerController = {
  getProviderProfile: getProviderProfile2,
  getSingleProvider: getSingleProvider2,
  createProviderProfile: createProviderProfile2
};

// src/modules/providers/provider.router.ts
var router2 = Router2();
router2.get("/", providerController.getProviderProfile);
router2.get("/:id", providerController.getSingleProvider);
router2.post("/create-profile", providerController.createProviderProfile);
var providerRouter = router2;

// src/modules/categories/category.router.ts
import { Router as Router3 } from "express";

// src/modules/categories/category.service.ts
var createCategory = async (data) => {
  try {
    const result = await prisma.category.create({
      data: {
        name: data.name
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
};
var getAllCategories = async () => {
  try {
    const result = await prisma.category.findMany({});
    return result;
  } catch (err) {
    throw err;
  }
};
var categoryService = {
  createCategory,
  getAllCategories
};

// src/modules/categories/category.controller.ts
var createCategory2 = async (req, res) => {
  try {
    const body = req.body;
    const result = await categoryService.createCategory(body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};
var getAllCategories2 = async (req, res) => {
  try {
    const result = await categoryService.getAllCategories();
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};
var categoryController = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2
};

// src/modules/categories/category.router.ts
var router3 = Router3();
router3.get("/", categoryController.getAllCategories);
router3.post("/create-category", categoryController.createCategory);
var categoryRoute = router3;

// src/modules/cart/cart.router.ts
import { Router as Router4 } from "express";

// src/modules/cart/cart.service.ts
var getCart = async (userid) => {
  try {
    const res = await prisma.cart.findUnique({
      where: {
        userId: userid
      },
      include: {
        items: true
      }
    });
    const total_count = res?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
    const subtotal = res?.items.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
    const deliveryFee = res?.items.length ? 5 : 0;
    const total = subtotal + deliveryFee;
    return { ...res, subtotal, deliveryFee, total, total_count };
  } catch (error) {
    return { success: false, error: "Failed add to cart" };
  }
};
var addToCart = async (body) => {
  try {
    const { meal, userId } = body;
    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }
    ;
    await prisma.cartItem.upsert({
      where: {
        cartId_mealId: {
          cartId: cart.id,
          mealId: meal.id
        }
      },
      update: {
        quantity: {
          increment: 1
        }
      },
      create: {
        cartId: cart.id,
        mealId: meal.id,
        title: meal.title,
        imageUrl: meal.imageUrl,
        price: meal.price,
        quantity: 1
      }
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed add to cart" };
  }
};
var removeFromCart = async (mealId) => {
  try {
    const res = await prisma.cartItem.delete({
      where: {
        id: mealId
      }
    });
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error: "Failed add to cart" };
  }
};
var cartService = {
  addToCart,
  removeFromCart,
  getCart
};

// src/modules/cart/cart.controller.ts
var addToCart2 = async (req, res) => {
  try {
    const body = req.body;
    const result = await cartService.addToCart(body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Meal" });
  }
};
var removeFromCart2 = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await cartService.removeFromCart(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Meal" });
  }
};
var getCart2 = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await cartService.getCart(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Meal" });
  }
};
var cartController = {
  addToCart: addToCart2,
  removeFromCart: removeFromCart2,
  getCart: getCart2
};

// src/modules/cart/cart.router.ts
var router4 = Router4();
router4.get("/:id", cartController.getCart);
router4.post("/", cartController.addToCart);
router4.delete("/:id", cartController.removeFromCart);
var cartRoute = router4;

// src/modules/addresses/address.router.ts
import { Router as Router5 } from "express";

// src/modules/addresses/address.service.ts
var getAddress = async (userid) => {
  try {
    const res = await prisma.address.findMany({
      where: {
        userId: userid
      }
    });
    return { success: true, res };
  } catch (error) {
    return { success: false, error: "Failed add to cart" };
  }
};
var addAddress = async (body) => {
  try {
    const res = await prisma.address.create({
      data: body
    });
    return { success: true, res };
  } catch (error) {
    return { success: false, error: "Failed add to cart" };
  }
};
var addressService = {
  addAddress,
  getAddress
};

// src/modules/addresses/address.controller.ts
var getAddress2 = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await addressService.getAddress(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Meal" });
  }
};
var addAddress2 = async (req, res) => {
  try {
    const body = req.body;
    const result = await addressService.addAddress(body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Meal" });
  }
};
var addressController = {
  addAddress: addAddress2,
  getAddress: getAddress2
};

// src/modules/addresses/address.router.ts
var router5 = Router5();
router5.get("/:id", addressController.getAddress);
router5.post("/add-address", addressController.addAddress);
var addressRoute = router5;

// src/modules/orders/order.router.ts
import { Router as Router6 } from "express";

// src/modules/orders/order.service.ts
var getAllOrders = async () => {
  try {
    const res = await prisma.order.findMany({});
    return res;
  } catch (error) {
    console.error("Error From Getting Orders: ", error);
    throw error;
  }
};
var getSpecificOrders = async (userid) => {
  try {
    const res = await prisma.order.findMany({
      where: {
        customerId: userid
      },
      include: {
        orderItems: {
          include: {
            meal: {
              select: {
                title: true
              }
            }
          }
        }
      }
    });
    return res;
  } catch (error) {
    console.error("Error From Getting Orders: ", error);
    throw error;
  }
};
var createOrder = async (body) => {
  const { orderItems, customerId, totalAmount, deliveryAddress } = body;
  try {
    const res = await prisma.order.create({
      data: {
        customerId,
        totalAmount: Number(totalAmount),
        deliveryAddress,
        orderItems: {
          create: orderItems.map((item) => ({
            mealId: item.mealId,
            quantity: Number(item.quantity),
            price: Number(item.price)
          }))
        }
      },
      include: { orderItems: true }
    });
    await prisma.cartItem.deleteMany({
      where: {
        cart: {
          userId: customerId
        }
      }
    });
    return res;
  } catch (error) {
    console.error("Order Creation Error: ", error);
    throw error;
  }
};
var orderService = {
  createOrder,
  getSpecificOrders,
  getAllOrders
};

// src/modules/orders/order.controller.ts
var getAllOrders2 = async (req, res) => {
  try {
    const result = await orderService.getAllOrders();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to Getting Orders Info" });
  }
};
var getSpecificOrders2 = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await orderService.getSpecificOrders(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to Getting Orders Info" });
  }
};
var createOrder2 = async (req, res) => {
  try {
    const body = req.body;
    const result = await orderService.createOrder(body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Order" });
  }
};
var orderController = {
  createOrder: createOrder2,
  getSpecificOrders: getSpecificOrders2,
  getAllOrders: getAllOrders2
};

// src/modules/orders/order.router.ts
var router6 = Router6();
router6.get("/", orderController.getAllOrders);
router6.get("/:id", orderController.getSpecificOrders);
router6.post("/placed-order", orderController.createOrder);
var orderRoute = router6;

// src/modules/customers/customers.router.ts
import { Router as Router7 } from "express";

// src/modules/customers/customers.service.ts
var getCustomers = async () => {
  try {
    const result = await prisma.user.findMany({});
    return result;
  } catch (err) {
    throw err;
  }
};
var updateStatus = async (userId, status) => {
  try {
    const res = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        status
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};
var getSpecificCustomer = async (userId) => {
  try {
    const res = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};
var customersService = {
  getCustomers,
  updateStatus,
  getSpecificCustomer
};

// src/modules/customers/customers.controller.ts
var getCustomers2 = async (req, res) => {
  try {
    const result = await customersService.getCustomers();
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};
var updateStatus2 = async (req, res) => {
  try {
    const { userId, status } = req.query;
    const result = await customersService.updateStatus(userId, status);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};
var getSpecificCustomer2 = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await customersService.getSpecificCustomer(userId);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err });
  }
};
var customersController = {
  getCustomers: getCustomers2,
  updateStatus: updateStatus2,
  getSpecificCustomer: getSpecificCustomer2
};

// src/modules/customers/customers.router.ts
var router7 = Router7();
router7.get("/", customersController.getCustomers);
router7.get("/:id", customersController.getSpecificCustomer);
router7.patch("/update-status", customersController.updateStatus);
var customersRoute = router7;

// src/modules/dashboards/dashboards.router.ts
import { Router as Router8 } from "express";

// src/modules/dashboards/dashboards.service.ts
var getUserDashboardStats = async (data) => {
  const result = await prisma.meal.create({
    data: {
      ...data
    }
  });
  return result;
};
var getProviderDashboardStats = async (payload) => {
  const meals = await prisma.meal.findMany({
    where: {
      ...payload
    }
  });
  return { meals, total: meals.length };
};
var getAdminDashboardStats = async (mealId) => {
  const meal = await prisma.meal.findFirstOrThrow({
    where: {
      id: mealId
    },
    include: {
      category: true,
      provider: true,
      reviews: true,
      orderItems: true
    }
  });
  return { meal };
};
var dashboardService = {
  getUserDashboardStats,
  getProviderDashboardStats,
  getAdminDashboardStats
};

// src/modules/dashboards/dashboards.controller.ts
var getUserDashboardStats2 = async (req, res) => {
  try {
    console.log(req.body);
    const result = await dashboardService.getUserDashboardStats(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Meal" });
  }
};
var getProviderDashboardStats2 = async (req, res) => {
  try {
    const result = await dashboardService.getProviderDashboardStats(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
var getAdminDashboardStats2 = async (req, res) => {
  try {
    const result = await dashboardService.getAdminDashboardStats(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
var dashboardController = {
  getUserDashboardStats: getUserDashboardStats2,
  getProviderDashboardStats: getProviderDashboardStats2,
  getAdminDashboardStats: getAdminDashboardStats2
};

// src/modules/dashboards/dashboards.router.ts
var router8 = Router8();
router8.get("/user-stats", dashboardController.getUserDashboardStats);
router8.get("/provider-stats", dashboardController.getProviderDashboardStats);
router8.get("/admin-stats", dashboardController.getAdminDashboardStats);
var dashboardRouter = router8;

// src/app.ts
var app = express();
app.use(express.json());
var allowedOrigins = [process.env.APP_URL || "https://food-hub-client-eight.vercel.app"].filter(Boolean);
app.use(
  cors({
    origin: "https://food-hub-client-eight.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
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
app.get("/", (req, res) => {
  res.send(`Food Hub server is running on Port: ${process.env.PORT || 5e3}`);
});
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
