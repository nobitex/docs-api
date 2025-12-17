import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useHistory } from '@docusaurus/router'
import { usePluginData } from '@docusaurus/useGlobalData'
import './styles.css'

interface SearchEntry {
    pageTitle: string
    pageUrl: string
    headingText: string
    headingSlug: string
    level: number
    content: string
    url: string
}

interface CustomSearchProps {
    isOpen: boolean
    onClose: () => void
}

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

export default function CustomSearch({ isOpen, onClose }: CustomSearchProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<SearchEntry[]>([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const history = useHistory()
    const inputRef = useRef<HTMLInputElement>(null)
    const resultsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])

    const pluginData = usePluginData('docusaurus-plugin-custom-search') as {
        searchIndex: SearchEntry[]
    }
    const searchIndex = pluginData?.searchIndex || []

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([])
            setSelectedIndex(0)
            return
        }

        const query = searchQuery.trim()

        const results = searchIndex.filter((entry) => entryMatchesQuery(entry, query))

        setSearchResults(results.slice(0, 10))
        setSelectedIndex(0)
    }, [searchQuery, searchIndex])

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex((prev) =>
                    prev < searchResults.length - 1 ? prev + 1 : prev
                )
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
            } else if (e.key === 'Enter' && searchResults.length > 0) {
                e.preventDefault()
                handleSelectResult(searchResults[selectedIndex])
            }
        },
        [searchResults, selectedIndex]
    )

    useEffect(() => {
        if (resultsRef.current) {
            const selectedElement = resultsRef.current.children[
                selectedIndex
                ] as HTMLElement
            if (selectedElement) {
                selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
            }
        }
    }, [selectedIndex])

    const handleSelectResult = (result: SearchEntry) => {
        history.push(result.url)
        onClose()
        setSearchQuery('')
    }

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div className="custom-search-overlay" onClick={handleOverlayClick}>
            <div className="custom-search-modal">
                <div className="custom-search-header">
                    <input
                        ref={inputRef}
                        type="text"
                        className="custom-search-input"
                        placeholder="جستجو در مستندات..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        dir="rtl"
                    />
                    <button
                        className="custom-search-close"
                        onClick={onClose}
                        aria-label="بستن"
                    >
                        ✕
                    </button>
                </div>

                {searchQuery && (
                    <div className="custom-search-results" ref={resultsRef}>
                        {searchResults.length > 0 ? (
                            searchResults.map((result, index) => (
                                <div
                                    key={`${result.url}-${index}`}
                                    className={`custom-search-result-item ${
                                        index === selectedIndex ? 'selected' : ''
                                    }`}
                                    onClick={() => handleSelectResult(result)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                >
                                    <div className="result-page-title">{result.pageTitle}</div>
                                    <div className="result-heading-text">
                                        {result.headingText}
                                    </div>
                                    <div className="result-url">{result.url}</div>
                                </div>
                            ))
                        ) : (
                            <div className="custom-search-no-results">نتیجه‌ای یافت نشد</div>
                        )}
                    </div>
                )}

                <div className="custom-search-footer">
                    <div className="custom-search-shortcuts">
            <span>
              <kbd>↑</kbd> <kbd>↓</kbd> برای پیمایش
            </span>
                        <span>
              <kbd>Enter</kbd> برای انتخاب
            </span>
                        <span>
              <kbd>Esc</kbd> برای بستن
            </span>
                    </div>
                </div>
            </div>
        </div>
    )
}