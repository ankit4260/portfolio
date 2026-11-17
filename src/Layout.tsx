type DividerProps = {
  className?: string
}

export function Divider({ className = '' }: DividerProps) {
  return (
    <div
      className={`divider ${className}`}
      aria-hidden="true"
    />
  )
}

type LayoutProps = {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="page-shell">
      <div className="page-frame">
        {children}
      </div>
    </div>
  )
}
