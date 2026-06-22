/**
 * Returns a helper that turns an internal app path into a locale-aware path,
 * so links keep the active locale prefix (e.g. `/en/...`) instead of falling
 * back to the default locale. Hash fragments (`/#section`) are preserved.
 */
export function useLocalizedTo() {
  const localePath = useLocalePath()

  return (to: string): string => {
    const hashIndex = to.indexOf('#')
    if (hashIndex === -1) {
      return localePath(to)
    }
    const path = to.slice(0, hashIndex) || '/'
    return `${localePath(path)}${to.slice(hashIndex)}`
  }
}
