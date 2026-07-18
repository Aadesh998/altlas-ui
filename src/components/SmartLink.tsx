import { Link, useLocation } from 'react-router'
import type { ComponentProps } from 'react'

interface SmartLinkProps extends ComponentProps<'a'> {
  href: string
}

export default function SmartLink({ href, ...props }: SmartLinkProps) {
  const { pathname } = useLocation()

  if (href.startsWith('#')) {
    const resolved = pathname === '/' ? href : `/${href}`
    return <a href={resolved} {...props} />
  }

  return <Link to={href} {...props} />
}
