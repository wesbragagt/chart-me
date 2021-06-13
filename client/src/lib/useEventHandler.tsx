import React from 'react'

/**
 * Make sure to optimize your handler dependencies by using a React.useCallback in order to avoid recreating the event listener multiple times.
 * @example const toggleSidebar = React.useCallback(
    () => setNavExpanded((state: boolean) => !state),
    [setNavExpanded]
  )
  const handleSidebarShortcut = React.useCallback<React.KeyboardEventHandler>(
    e => {
      const isAltS = (e.metaKey || e.altKey) && e.key === 's'
      if (isAltS) {
        toggleSidebar()
      }
    },
    [toggleSidebar]
  )
  useEventListener('keydown', handleSidebarShortcut)
 */
const useEventListener = (
    type: keyof DocumentEventMap,
    handler: React.EventHandler<any>
) => {
    React.useEffect(() => {
        document.addEventListener(type, handler)
        return () => document.removeEventListener(type, handler)
    }, [type, handler])
}

export default useEventListener
