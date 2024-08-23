/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./lib/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.DB_URL,
    }
  };