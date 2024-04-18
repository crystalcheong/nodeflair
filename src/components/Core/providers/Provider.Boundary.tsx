import { logger, LogLevel } from '@/utils/debug'
import { Component, ErrorInfo, ReactNode } from 'react'

type BoundaryProviderProps = {
  fallback?: ReactNode
  children: ReactNode
}

type BoundaryProviderState = {
  hasError: boolean
}

export class BoundaryProvider extends Component<
  BoundaryProviderProps,
  BoundaryProviderState
> {
  constructor(props: BoundaryProviderProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): BoundaryProviderState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logger(
      { breakpoint: '[Error.Boundary.tsx:55]', level: LogLevel.Error },
      { error, info },
    )
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }

    return this.props.children
  }
}
