import { useEffect, useRef } from 'react'

export function useAutoFocusOnOpen<T extends HTMLElement>(isOpen: boolean) {
    const ref = useRef<T | null>(null)

    useEffect(() => {
        if (isOpen && ref.current) {
            ref.current.focus()
        }
    }, [isOpen])

    return ref
}