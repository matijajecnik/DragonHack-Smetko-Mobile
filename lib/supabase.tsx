import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkbHhidXV5cWRvZmxueXVwdmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5OTE5MDMsImV4cCI6MTk5OTU2NzkwM30.cmal4fflbibP3mGASRiYWRNMFIIIiuJZn0u9w4w1Ix8"
const supabaseUrl = "https://cdlxbuuyqdoflnyupvem.supabase.co/"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)