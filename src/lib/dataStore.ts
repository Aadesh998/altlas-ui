import { useState } from 'react'

/**
 * Generic localStorage-backed CRUD store, seeded from a hardcoded default array on first
 * use. Powers the admin panel's ability to add/edit/delete packages and destinations —
 * every consuming page reads through this instead of importing the static data directly.
 */
export function createLocalStore<T extends { slug: string }>(key: string, seed: T[]) {
  function getAll(): T[] {
    try {
      const raw = localStorage.getItem(key)
      if (raw) return JSON.parse(raw)
    } catch {
      // fall through to reseed
    }
    localStorage.setItem(key, JSON.stringify(seed))
    return seed
  }

  function writeAll(items: T[]) {
    localStorage.setItem(key, JSON.stringify(items))
  }

  function add(item: T) {
    const items = getAll()
    if (items.some((i) => i.slug === item.slug)) {
      throw new Error(`An item with the slug "${item.slug}" already exists.`)
    }
    const next = [item, ...items]
    writeAll(next)
    return next
  }

  function update(slug: string, patch: Partial<T>) {
    const next = getAll().map((i) => (i.slug === slug ? { ...i, ...patch } : i))
    writeAll(next)
    return next
  }

  function remove(slug: string) {
    const next = getAll().filter((i) => i.slug !== slug)
    writeAll(next)
    return next
  }

  function reset() {
    writeAll(seed)
    return seed
  }

  return { getAll, add, update, remove, reset }
}

export interface LocalStore<T> {
  getAll: () => T[]
  add: (item: T) => T[]
  update: (slug: string, patch: Partial<T>) => T[]
  remove: (slug: string) => T[]
  reset: () => T[]
}

/** Reactive read of a local store — reads synchronously on first render (no empty-then-populate flash), plus a manual refresh for after writes. */
export function useLocalStore<T>(store: LocalStore<T>) {
  const [items, setItems] = useState<T[]>(() => store.getAll())

  const refresh = () => setItems(store.getAll())

  return { items, refresh }
}

export interface SingletonStore<T> {
  get: () => T
  set: (value: T) => T
  reset: () => T
}

/**
 * Like createLocalStore, but for a single editable content object (e.g. hero copy) rather
 * than a list of records.
 */
export function createSingletonStore<T>(key: string, seed: T): SingletonStore<T> {
  function get(): T {
    try {
      const raw = localStorage.getItem(key)
      if (raw) return JSON.parse(raw)
    } catch {
      // fall through to reseed
    }
    localStorage.setItem(key, JSON.stringify(seed))
    return seed
  }

  function set(value: T) {
    localStorage.setItem(key, JSON.stringify(value))
    return value
  }

  function reset() {
    localStorage.setItem(key, JSON.stringify(seed))
    return seed
  }

  return { get, set, reset }
}

/** Reactive read of a singleton store — reads synchronously on first render, plus a manual refresh for after writes. */
export function useSingletonStore<T>(store: SingletonStore<T>) {
  const [value, setValue] = useState<T>(() => store.get())

  const refresh = () => setValue(store.get())

  return { value, refresh }
}

export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
