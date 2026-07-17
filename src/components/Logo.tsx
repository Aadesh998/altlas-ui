interface LogoProps {
  className?: string
  wordmark?: string
}

export default function Logo({ className = 'text-white', wordmark }: LogoProps) {
  return (
    <a href="#top" className={`flex items-center gap-3 ${className}`} aria-label="AXLE home">
      {/* Steering wheel mark */}
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
        <circle cx="24" cy="24" r="20" />
        <circle cx="24" cy="24" r="5.5" />
        <path d="M24 4v14.5" />
        <path d="M6.6 34.5l13-7.4" />
        <path d="M41.4 34.5l-13-7.4" />
      </svg>
      <span className={`text-[1.55rem] font-medium tracking-[0.42em] ${wordmark ?? ''} pl-[0.1em]`}>
        AXLE
      </span>
    </a>
  )
}
