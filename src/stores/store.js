import { writable } from 'svelte/store'

export const loading = writable(false)
export const activeTab = writable('#search')
export const chainConnected = writable('')
export const searchUri = writable('')

export const tokenUri = writable('')