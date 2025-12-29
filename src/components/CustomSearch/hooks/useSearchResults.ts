import { useEffect, useState } from 'react'
import type { SearchEntry } from './useSearchIndex'

const MAX_RESULTS = 10

const normalizeText = (text: string): string => {
    if (!text) return ''

    return text
        .toLowerCase()
        .replace(/[\u064A\u0649]/g, 'ی')
        .replace(/\u0643/g, 'ک')
        .replace(/[\u06C0\u06C1\u0629]/g, 'ه')
        .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
        .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

const entryMatchesQuery = (entry: SearchEntry, rawQuery: string): boolean => {
    const normalizedQuery = normalizeText(rawQuery)
    if (!normalizedQuery) return false

    const queryTokens = normalizedQuery.split(' ').filter(Boolean)
    if (!queryTokens.length) return false

    const haystack = normalizeText(
        `${entry.pageTitle} ${entry.headingText} ${entry.content ?? ''}`
    )

    return queryTokens.every((q) => haystack.includes(q))
}

export function useSearchResults(
    searchQuery: string,
    searchIndex: SearchEntry[]
) {
    const [searchResults, setSearchResults] = useState<SearchEntry[]>([])

    useEffect(() => {
        const trimmed = searchQuery.trim()

        if (!trimmed) {
            setSearchResults([])
            return
        }

        const results = searchIndex.filter((entry) =>
            entryMatchesQuery(entry, trimmed)
        )

        setSearchResults(results.slice(0, MAX_RESULTS))
    }, [searchQuery, searchIndex])

    return searchResults
}