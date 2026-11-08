import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function PegarTarefas() {

    const {data: {user}, error: userError} = await supabase.auth.getUser();
    
    if( userError || !user ){
        return;
    }
    const { data: tarefas, error } = await supabase.from('Tarefas').select('*').eq('user_id', user.id);

    if (error) {
        alert(error.message);
    }
    return tarefas
}

