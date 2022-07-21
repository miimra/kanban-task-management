import { supabase } from '../../utils/supabaseClient'

export default function handler(req: any, res: any) {
  supabase.auth.api.setAuthCookie(req, res)
}