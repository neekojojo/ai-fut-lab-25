
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log("⚽ استدعاء Opta FIFA API Edge Function");
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("👋 استجابة للطلب المسبق CORS");
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get API key from environment variables
    const API_KEY = Deno.env.get('OPTA_FIFA_API_KEY');
    const API_BASE_URL = Deno.env.get('OPTA_FIFA_API_BASE_URL') || 'https://api.fifa.com/api/v3';
    
    if (!API_KEY) {
      console.error("❌ مفتاح API غير موجود: OPTA_FIFA_API_KEY");
      throw new Error('OPTA_FIFA_API_KEY is not set in environment variables');
    }
    
    // Parse request body
    const { endpoint, params } = await req.json();
    console.log(`📩 الوجهة: ${endpoint}, المعاملات:`, params);
    
    // Create URL with parameters
    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    
    // Make API request
    console.log(`🔄 طلب API إلى: ${url.toString()}`);
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-Auth-Token': API_KEY,
        'Content-Type': 'application/json',
      },
    });
    
    // Check for API response errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ خطأ من API: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`API responded with status: ${response.status} ${response.statusText}`);
    }
    
    // Parse and return the response
    const data = await response.json();
    console.log(`✅ استجابة ناجحة من API`);
    
    // Cache data in Supabase for faster access next time
    try {
      // Create Supabase client
      const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
      
      if (supabaseUrl && supabaseKey) {
        console.log(`💾 محاولة تخزين البيانات في ذاكرة التخزين المؤقت`);
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Store in cache table
        await supabase.from('api_cache').upsert({
          api: 'opta-fifa',
          endpoint,
          params: params || {},
          data,
          cached_at: new Date().toISOString()
        }, {
          onConflict: 'api,endpoint,params'
        });
        console.log(`✅ تم تخزين البيانات في ذاكرة التخزين المؤقت`);
      } else {
        console.log(`⚠️ التخزين المؤقت غير متاح: مفاتيح Supabase مفقودة`);
      }
    } catch (cacheError) {
      console.error(`⚠️ خطأ في تخزين البيانات في ذاكرة التخزين المؤقت:`, cacheError);
      // Caching error shouldn't stop the response
    }
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('❌ خطأ في Opta/FIFA API proxy:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
