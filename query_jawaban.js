require('dotenv').config({path: '.env.local'});
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xxx.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'xxx';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: sData } = await supabase.from('survey_results').select('*').limit(3).order('created_at', { ascending: false });
  console.log("jawaban keys:", sData.map(s => Object.keys(s.jawaban)));
  console.log("jawaban values:", sData.map(s => s.jawaban));
}
check();
