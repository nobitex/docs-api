import { useCallback, useEffect, useRef, useState } from 'react'
import type { SearchEntry } from './useSearchIndex'

interface UseSearchNavigationParams {
    searchResults: SearchEntry[]
    onSelectResult: (result: SearchEntry) => void
}

export function useSearchNavigation({
    searchResults,
    onSelectResult,
}: UseSearchNavigationParams) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const resultsRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        setSelectedIndex(0)
    }, [searchResults])

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex((prev) =>
                    Math.min(prev + 1, searchResults.length - 1)
                )
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex((prev) => Math.max(prev - 1, 0))
            } else if (e.key === 'Enter' && searchResults.length > 0) {
                e.preventDefault()
                onSelectResult(searchResults[selectedIndex])
            }
        },
        [searchResults, selectedIndex, onSelectResult]
    )

    useEffect(() => {
        if (!resultsRef.current) return
        const selectedElement = resultsRef.current.children[
            selectedIndex
            ] as HTMLElement | undefined

        selectedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }, [selectedIndex])

    return {
        selectedIndex,
        setSelectedIndex,
        handleKeyDown,
        resultsRef,
    }
}