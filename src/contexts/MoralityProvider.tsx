import { ReactNode, useEffect, useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import { MoralityContext } from "./MoralityContext";
import { useMoralityState } from "../hooks/useMoralityState";
import { isLocalStorageAvailable } from "../utils/storage";

interface MoralityProviderProps {
    children: ReactNode;
}

function StorageWarning() {
    return (
        <div className="mb-4 rounded bg-yellow-100 p-3 text-yellow-800">
            <p>
                Warning: Your progress can't be saved because your browser's localStorage is disabled or otherwise
                broken.
            </p>
        </div>
    );
}

function MoralityProviderContent({ children }: { children: ReactNode }) {
    const moralityState = useMoralityState();
    const [isStorageAvailable, setIsStorageAvailable] = useState(true);

    useEffect(() => {
        setIsStorageAvailable(isLocalStorageAvailable());
    }, []);

    return (
        <>
            {!isStorageAvailable && <StorageWarning />}
            <MoralityContext.Provider value={moralityState}>{children}</MoralityContext.Provider>
        </>
    );
}

export function MoralityProvider({ children }: MoralityProviderProps) {
    return (
        <ErrorBoundary
            fallback={
                <div className="rounded-md border border-red-300 bg-red-100 p-4">
                    <h2 className="text-lg font-medium text-red-700">Error in Morality Tracker</h2>
                    <p className="text-red-600">
                        There was a problem loading your saved choices. This might be due to browser restrictions or
                        corrupted data.
                    </p>
                    <p className="mt-2 text-gray-700">
                        Try refreshing the page or clearing your browser's localStorage.
                    </p>
                    <button
                        className="mt-3 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        Refresh Page
                    </button>
                </div>
            }
        >
            <MoralityProviderContent>{children}</MoralityProviderContent>
        </ErrorBoundary>
    );
}
