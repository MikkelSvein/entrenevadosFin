// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// El cliente manejará la persistencia (localStorage) automáticamente en el navegador.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Puedes ajustar opciones si quieres
    persistSession: true, // por default true en supabase-js v2
    // storage: customStorage // opcional si quieres custom storage
  },
});
