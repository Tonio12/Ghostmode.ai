export const config = {
    env: {
        databaseUrl: process.env.DATABASE_URL!,
        appUrl: process.env.NEXT_PUBLIC_APP_URL!,
        google: {
            id: process.env.GOOGLE_CLIENT_ID!,
            secret: process.env.GOOGLE_CLIENT_SECRET!
        },
        deepSeekApiKey: process.env.DEEPSEEK_API_KEY!
    }
}