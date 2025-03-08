import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cfmnxtrkhogwlaycgofj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmbW54dHJraG9nd2xheWNnb2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMTEyNzEsImV4cCI6MjA1Njg4NzI3MX0.gwaGcAIALCU7le18Acvqf67bEUPaIUIrxKn0a0P_Bgw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
