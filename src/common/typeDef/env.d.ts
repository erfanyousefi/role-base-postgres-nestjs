declare namespace NodeJS {
    interface ProcessEnv {
        NodeEnv: string
        DB_HOST: string;
        DB_NAME: string;
        DB_USERNAME: string;
        DB_PASSWORD: string;
        DB_PORT: number;
        DB_TYPE: string;
        APP_HOST: string;
        APP_PORT: number;
        APP_METHOD: string;
        JWT_SECRET_KEY: string;
        ACCESS_TOKEN_EXPIRES_IN: string;
        REFRESH_TOKEN_EXPIRES_IN: string;
    }
}