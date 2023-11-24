import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://gsnjnmdrfalopkbxdodv.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseInit = createClient(supabaseUrl, supabaseKey);

export default supabaseInit;
