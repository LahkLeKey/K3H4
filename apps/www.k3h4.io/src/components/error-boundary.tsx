import React from 'react'

interface ErrorBoundaryState {
    hasError: boolean
    message?: string
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
    constructor(props: React.PropsWithChildren) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
        return { hasError: true, message: error instanceof Error ? error.message : 'Something went wrong' }
    }

    componentDidCatch(error: unknown, errorInfo: unknown) {
        console.error('ErrorBoundary caught', { error, errorInfo })
    }

    handleRetry = () => {
        this.setState({ hasError: false, message: undefined })
        location.reload()
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
                    <div className="max-w-md space-y-3 rounded-xl border bg-card p-6 shadow-sm">
                        <p className="text-lg font-semibold">Something went wrong</p>
                        <p className="text-sm text-muted-foreground">{this.state.message}</p>
                        <button
                            type="button"
                            onClick={this.handleRetry}
                            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:brightness-105"
                        >
                            Reload app
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
