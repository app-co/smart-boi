import { z } from 'zod';

const schemeApp = z.object({
  APP: z.enum(['PRD', 'develop']),
});

const environment = schemeApp.safeParse(process.env);

if (environment.success === false) {
  throw new Error('Envalid enviroment');
}

export const env = environment.data;
