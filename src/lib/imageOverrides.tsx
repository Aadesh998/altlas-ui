import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'axle_image_overrides'

type Overrides = Record<string, string>

interface ImageOverridesContextValue {
  overrides: Overrides
  setOverride: (key: string, url: string) => void
  resetOverride: (key: string) => void
}

const ImageOverridesContext = createContext<ImageOverridesContextValue | null>(null)

function readOverrides(): Overrides {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

export function ImageOverridesProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Overrides>({})

  useEffect(() => {
    setOverrides(readOverrides())
  }, [])

  const setOverride = (key: string, url: string) => {
    setOverrides((prev) => {
      const next = { ...prev, [key]: url }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const resetOverride = (key: string) => {
    setOverrides((prev) => {
      const next = { ...prev }
      delete next[key]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  return (
    <ImageOverridesContext.Provider value={{ overrides, setOverride, resetOverride }}>
      {children}
    </ImageOverridesContext.Provider>
  )
}

export function useImageOverrides() {
  const ctx = useContext(ImageOverridesContext)
  if (!ctx) throw new Error('useImageOverrides must be used within ImageOverridesProvider')
  return ctx
}

/** Safe to call inside .map() loops, unlike a hook. */
export function resolveImage(overrides: Overrides, key: string, fallback: string): string {
  return overrides[key] ?? fallback
}

/** Convenience hook for a single, non-looped image reference. */
export function useSiteImage(key: string, fallback: string): string {
  const { overrides } = useImageOverrides()
  return resolveImage(overrides, key, fallback)
}
