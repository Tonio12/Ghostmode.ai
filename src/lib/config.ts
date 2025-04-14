export const config = {
    env: {
        databaseUrl: process.env.DATABASE_URL!,
        google: {
            id: process.env.GOOGLE_CLIENT_ID!,
            secret: process.env.GOOGLE_CLIENT_SECRET!
        }
    }
}