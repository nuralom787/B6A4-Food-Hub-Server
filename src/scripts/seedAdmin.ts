import { prisma } from "../lib/prisma";
import { UserRoles } from "../middleware/authMiddleware";

async function seedAdmin() {
    try {
        const adminUser = {
            name: "admin",
            email: "admin@gmail.com",
            role: UserRoles.ADMIN,
            password: "admin123"
        };

        // ! Check if admin user already exists
        const existingUser = await prisma.users.findUnique({ where: { email: adminUser.email } });

        if (existingUser) {
            throw new Error("User already exists");
        };

        const signedUpAdmin = await fetch("http://localhost:5000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(adminUser)
        });

        // console.log("From Seed Admin: ", signedUpAdmin);

        if (!signedUpAdmin.ok) {
            const errorData = await signedUpAdmin.json();
            throw new Error(`Failed to create admin user: ${errorData.message}`);
        };

        if (signedUpAdmin.ok) {
            const updateUser = await prisma.users.update({
                where: { email: adminUser.email },
                data: { role: UserRoles.ADMIN }
            });

            console.log("Admin user created successfully", updateUser);
        };

    }
    catch (err) {
        console.log(err);
    }
};

seedAdmin();