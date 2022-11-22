import { writable } from 'svelte/store'

export const loading = writable(false)
export const activeTab = writable('#search')
export const chainConnected = writable('')
export const cssUri = writable('')
export const metadataUri = writable('')

export const tokenUri = writable('')