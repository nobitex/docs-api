import React, { useCallback } from 'react'

export function useOverlayClick(onClose: () => void) {
    return useCallback(
        (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
                onClose()
            }
        },
        [onClose]
    )
}