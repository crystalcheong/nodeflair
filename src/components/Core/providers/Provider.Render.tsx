import { BoundaryProvider } from '@/components/Core/providers/Provider.Boundary'
import { FC, PropsWithChildren, ReactNode, useEffect, useState } from 'react'

interface RenderProvider extends PropsWithChildren {
  renderIf?: boolean
  fallback?: ReactNode
}

export const RenderProvider: FC<RenderProvider> = ({
  children,
  renderIf = true,
  fallback,
}: RenderProvider) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [mounted])

  if (!mounted) return null
  return (
    <BoundaryProvider fallback={fallback}>
      {renderIf ? children : fallback ?? null}
    </BoundaryProvider>
  )
}
