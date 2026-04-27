require('dotenv').config({path: '.env.local'});
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xxx.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'xxx';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: sData } = await supabase.from('survey_results').select('*').limit(1);
  console.log("survey_results cols:", sData ? Object.keys(sData[0] || {}) : 'no data');
  const { data: qData } = await supabase.from('quiz_results').select('*').limit(1);
  console.log("quiz_results cols:", qData ? Object.keys(qData[0] || {}) : 'no data');
}
check();
