import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://gsnjnmdrfalopkbxdodv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzbmpubWRyZmFsb3BrYnhkb2R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1NDk4NTQsImV4cCI6MjAxNjEyNTg1NH0.hoZPb04aAUoV4-Lqnvv6AGoJ87AFQVP8ZTm9VC9lWmA";
const supabaseInit = createClient(supabaseUrl, supabaseKey);

export default supabaseInit;
