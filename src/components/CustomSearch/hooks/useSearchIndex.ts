import { usePluginData } from '@docusaurus/useGlobalData'

export interface SearchEntry {
    pageTitle: string
    pageUrl: string
    headingText: string
    headingSlug: string
    level: number
    content: string
    url: string
}

export function useSearchIndex() {
    const pluginData = usePluginData('docusaurus-plugin-custom-search') as {
        searchIndex: SearchEntry[]
    }

    return pluginData?.searchIndex || []
}