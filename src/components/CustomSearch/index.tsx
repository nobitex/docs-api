import React, { useState, useCallback } from 'react'
import { useHistory } from '@docusaurus/router'
import { useEscapeKey } from './hooks/useEscapeKey'
import { useAutoFocusOnOpen } from './hooks/useAutoFocusOnOpen'
import { useSearchIndex, SearchEntry } from './hooks/useSearchIndex'
import { useSearchResults } from './hooks/useSearchResults'
import { useSearchNavigation } from './hooks/useSearchNavigation'
import { useOverlayClick } from './hooks/useOverlayClick'

interface CustomSearchProps {
    isOpen: boolean
    onClose: () => void
}

const KEYBOARD_SHORTCUTS = [
    { keys: ['↑', '↓'], label: 'برای پیمایش' },
    { keys: ['Enter'], label: 'برای انتخاب' },
    { keys: ['Esc'], label: 'برای بستن' },
] as const

export default function CustomSearch({ isOpen, onClose }: CustomSearchProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const history = useHistory()

    useEscapeKey(onClose, isOpen)
    const inputRef = useAutoFocusOnOpen<HTMLInputElement>(isOpen)
    const searchIndex = useSearchIndex()
    const searchResults = useSearchResults(searchQuery, searchIndex)
    const handleSelectResult = useCallback(
        (result: SearchEntry) => {
            history.push(result.url)
            onClose()
            setSearchQuery('')
        },
        [history, onClose]
    )
    const {
        selectedIndex,
        setSelectedIndex,
        handleKeyDown,
        resultsRef,
    } = useSearchNavigation({
        searchResults,
        onSelectResult: handleSelectResult,
    })

    const handleOverlayClick = useOverlayClick(onClose)

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
                                    <div className="result-page-title">
                                        {result.pageTitle}
                                    </div>
                                    <div className="result-heading-text">
                                        {result.headingText}
                                    </div>
                                    <div className="result-url">{result.url}</div>
                                </div>
                            ))
                        ) : (
                            <div className="custom-search-no-results">
                                نتیجه‌ای یافت نشد
                            </div>
                        )}
                    </div>
                )}

                <div className="custom-search-footer">
                    <div className="custom-search-shortcuts">
                        {KEYBOARD_SHORTCUTS.map(({ keys, label }) => (
                            <span key={label}>
                                {keys.map((key) => (
                                    <kbd key={key}>{key}</kbd>
                                ))}{' '}
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}