import { z } from 'zod';

const envSchema = z.object({
    VITE_API_URL: z.string().url()
});

export const env = envSchema.parse(import.meta.env);

// -- to read variables don't use env.process, use import.mets.env
