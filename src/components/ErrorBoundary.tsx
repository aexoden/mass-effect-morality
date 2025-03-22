import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    error?: Error;
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { error, hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error("Error caught by boundary:", error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div className="rounded-md border border-red-300 bg-red-100 p-4">
                        <h2 className="text-lg font-medium text-red-700">Something went wrong</h2>
                        <p className="text-red-600">{this.state.error?.message ?? "An unexpected error occurred"}</p>
                        <button
                            className="mt-2 rounded-md bg-red-200 px-3 py-1 hover:bg-red-300"
                            onClick={() => {
                                this.setState({ hasError: false });
                            }}
                        >
                            Try again
                        </button>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
