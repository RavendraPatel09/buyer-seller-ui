import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Command, Search, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const commands = [
  { label: 'Browse marketplace', href: '/marketplace' },
  { label: 'Open messages', href: '/messages' },
  { label: 'Create account', href: '/register' },
  { label: 'Sign in', href: '/login' },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(true)
      }
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const filteredCommands = useMemo(() => {
    const value = query.toLowerCase()
    return commands.filter((command) => command.label.toLowerCase().includes(value))
  }, [query])

  const onSelect = (href: string) => {
    setOpen(false)
    navigate(href)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-2 text-sm text-muted-foreground shadow-depth-1 sm:inline-flex"
      >
        <Command className="h-4 w-4" />
        <span className="font-mono text-[11px] uppercase tracking-[0.22em]">⌘K</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center bg-background/70 px-4 pt-24 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 12, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="w-full max-w-xl overflow-hidden rounded-[1.5rem] border border-border/70 bg-card/95 shadow-depth-3"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search the product"
                  className="w-full border-none bg-transparent text-sm outline-none"
                />
              </div>
              <div className="max-h-72 overflow-auto p-2">
                {filteredCommands.map((command) => (
                  <button
                    key={command.label}
                    type="button"
                    onClick={() => onSelect(command.href)}
                    className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm transition-colors hover:bg-muted"
                  >
                    <span>{command.label}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
