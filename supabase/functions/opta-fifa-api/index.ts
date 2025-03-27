
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get API key from environment variables
    const API_KEY = Deno.env.get('OPTA_FIFA_API_KEY');
    const API_BASE_URL = Deno.env.get('OPTA_FIFA_API_BASE_URL') || 'https://api.fifa.com/api/v3';
    
    if (!API_KEY) {
      throw new Error('OPTA_FIFA_API_KEY is not set in environment variables');
    }
    
    // Parse request body
    const { endpoint, params } = await req.json();
    
    // Create URL with parameters
    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    
    // Make API request
    console.log(`Making request to: ${url.toString()}`);
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-Auth-Token': API_KEY,
        'Content-Type': 'application/json',
      },
    });
    
    // Parse and return the response
    const data = await response.json();
    
    // Cache data in Supabase for faster access next time
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Store in cache table (we'll create this table later)
    await supabase.from('api_cache').upsert({
      api: 'opta-fifa',
      endpoint,
      params: params || {},
      data,
      cached_at: new Date().toISOString()
    }, {
      onConflict: 'api,endpoint,params'
    });
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in Opta/FIFA API proxy:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
