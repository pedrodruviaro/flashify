import type { Database } from "~/supabase/schema"

export type ProfilesRow = Database["public"]["Tables"]["profiles"]["Row"]

export interface UpdateProfileOptions {
  jobtitle: string
  site: string
  bio: string
}
