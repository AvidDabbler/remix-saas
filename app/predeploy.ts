// Importing modules using ESM syntax
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "../drizzle/config.ts";
import { password, user } from "../drizzle/schema.ts";

import { envConfig } from "./config.server.ts";

// The predeploy function using Promise structure
function predeploy() {
  return new Promise((resolve, reject) => {
    const email = envConfig.ADMIN_EMAIL;
    db.select()
      .from(user)
      .where(eq(user.email, email))
      .then((users) => {
        const [_user] = users;
        if (_user) {
          resolve(null); // Early exit if user exists
          return;
        }

        bcrypt
          .hash(envConfig.ADMIN_PASSWORD, 10)
          .then((hashedPassword) => {
            return db.transaction((tx) => {
              return tx
                .insert(user)
                .values([{ email, updatedAt: new Date().toISOString() }])
                .returning({ id: user.id })
                .then((createdUsers) => {
                  const [createdUser] = createdUsers;
                  if (!createdUser) {
                    throw new Error("Failed to create user");
                  }
                  return tx.insert(password).values({
                    userId: createdUser.id,
                    hash: hashedPassword,
                  });
                });
            });
          })
          .then(() => {
            console.log(`Database has been seeded. 🌱`);
            resolve(null);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Exporting the predeploy function using ESM syntax
export { predeploy };
