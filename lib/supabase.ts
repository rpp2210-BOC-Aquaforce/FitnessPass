/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createClient } from '@supabase/supabase-js';

export default createClient(
  process.env.DB_URL!,
  process.env.DB_API_KEY!,
);
