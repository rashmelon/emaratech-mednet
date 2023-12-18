import {createClient} from "@supabase/supabase-js";

class SupaBase {
    constructor() {
        if (!SupaBase.instance) {
            // Your configuration properties can be set here
            this.supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY)

            SupaBase.instance = this;
        }

        return SupaBase.instance;
    }
}

const supabaseConfig = new SupaBase();
Object.freeze(supabaseConfig);

export default supabaseConfig;