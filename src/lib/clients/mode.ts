// Build mode flags, isolated from the client registry so that importing them
// (e.g. from client components) does NOT pull every client's config into the
// browser bundle. Reads only the build-time env var (inlined by Next).
export const SINGLE_CLIENT_SLUG: string | null =
  process.env.NEXT_PUBLIC_CLIENT?.trim() || null;

export const isSingleClientBuild = SINGLE_CLIENT_SLUG !== null;
