import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
    'https://bhskhuzpkiyxzefgqbgz.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoc2todXpwa2l5eHplZmdxYmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTg0MjMwOTcsImV4cCI6MTk3Mzk5OTA5N30.XncUftDU-rUgnr9Ef_upkA9xZZk8TVSoLiIJenRS1yI')

export default supabase;

