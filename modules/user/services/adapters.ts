import type { User } from "~/modules/user/entities/User/User"
import type { ProfilesRow } from "./types"

export function getMeAdapter(data: ProfilesRow | null): User | null {
  if (!data) return null

  return {
    id: data.id,
    avatarUrl: data.avatar_url,
    name: data.name,
    email: data.email,
    bio: data.bio ?? undefined,
    site: data.site ?? undefined,
    jobtitle: data.jobtitle ?? undefined,
    createdAt: new Date(data.created_at),
  }
}
