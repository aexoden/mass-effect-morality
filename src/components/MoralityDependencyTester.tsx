import { useState } from "react";
import { runDependencyMoralityTests, TestSuiteResults } from "../tests/dependencyMoralityTest";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function MoralityDependencyTester() {
    const [testResults, setTestResults] = useState<TestSuiteResults | null>(null);
    const [loading, setLoading] = useState(false);

    const runTests = () => {
        setLoading(true);

        setTimeout(() => {
            try {
                const results = runDependencyMoralityTests();
                setTestResults(results);
            } catch (error) {
                console.error("Error running tests:", error);
            } finally {
                setLoading(false);
            }
        }, 10);
    };

    return (
        <div className="mx-auto max-w-5xl rounded-lg bg-white p-6 shadow-lg">
            <h1 className="mb-4 text-2xl font-bold text-gray-800">Morality Calculator Tests</h1>
            <p className="mb-4 text-gray-600">
                Tests the morality calculator to ensure that available points are calculated correctly.
            </p>

            <button
                onClick={runTests}
                disabled={loading}
                className={`mb-6 ${loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"} rounded px-4 py-2 font-medium text-white transition`}
            >
                {loading ? "Running Tests..." : "Run Tests"}
            </button>

            {testResults && (
                <div className="space-y-8">
                    <div className="overflow-hidden rounded-lg border">
                        <div className="border-b bg-gray-100 px-4 py-3">
                            <h2 className="text-lg font-semibold">Individual Section Tests</h2>
                        </div>

                        <div className="p-4">
                            <div className="mb-4">
                                <h3 className="mb-2 flex items-center font-medium text-green-600">
                                    <CheckIcon className="mr-2 h-5 w-5" />
                                    Passed: {Object.keys(testResults.individualTests.passed).length} sections
                                </h3>

                                {Object.keys(testResults.individualTests.passed).length > 0 && (
                                    <div className="grid grid-cols-1 gap-2 pl-7 md:grid-cols-2">
                                        {Object.entries(testResults.individualTests.passed).map(([id, result]) => (
                                            <div
                                                key={id}
                                                className="text-sm"
                                            >
                                                <span className="font-medium">{id}:</span> [P:{result.expected[0]}, R:
                                                {result.expected[1]}]
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <h3
                                    className={`${Object.keys(testResults.individualTests.failed).length > 0 ? "text-red-600" : "text-gray-400"} mb-2 flex items-center font-medium`}
                                >
                                    <XMarkIcon className="mr-2 h-5 w-5" />
                                    Failed: {Object.keys(testResults.individualTests.failed).length} sections
                                </h3>

                                {Object.keys(testResults.individualTests.failed).length > 0 && (
                                    <div className="space-y-2 pl-7">
                                        {Object.entries(testResults.individualTests.failed).map(([id, result]) => (
                                            <div
                                                key={id}
                                                className="text-sm"
                                            >
                                                <div className="font-medium">{id}:</div>
                                                <div className="grid grid-cols-2 gap-2 pl-4">
                                                    <div>
                                                        Expected: [P:{result.expected[0]}, R:{result.expected[1]}]
                                                    </div>
                                                    <div>
                                                        Actual: [P:{result.actual[0]}, R:{result.actual[1]}]
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border">
                        <div className="border-b bg-gray-100 px-4 py-3">
                            <h2 className="text-lg font-semibold">Combined Section Tests</h2>
                        </div>

                        <div className="p-4">
                            {/* Passed Tests */}
                            <div className="mb-4">
                                <h3 className="mb-2 flex items-center font-medium text-green-600">
                                    <CheckIcon className="mr-2 h-5 w-5" />
                                    Passed: {Object.keys(testResults.combinedTests.passed).length} combined sections
                                </h3>

                                {Object.keys(testResults.combinedTests.passed).length > 0 && (
                                    <div className="grid grid-cols-1 gap-2 pl-7 md:grid-cols-2">
                                        {Object.entries(testResults.combinedTests.passed).map(([name, result]) => (
                                            <div
                                                key={name}
                                                className="text-sm"
                                            >
                                                <span className="font-medium">{name}:</span> [P:{result.expected[0]}, R:
                                                {result.expected[1]}]
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <h3
                                    className={`${Object.keys(testResults.combinedTests.failed).length > 0 ? "text-red-600" : "text-gray-400"} mb-2 flex items-center font-medium`}
                                >
                                    <XMarkIcon className="mr-2 h-5 w-5" />
                                    Failed: {Object.keys(testResults.combinedTests.failed).length} combined sections
                                </h3>

                                {Object.keys(testResults.combinedTests.failed).length > 0 && (
                                    <div className="space-y-2 pl-7">
                                        {Object.entries(testResults.combinedTests.failed).map(([name, result]) => (
                                            <div
                                                key={name}
                                                className="text-sm"
                                            >
                                                <div className="font-medium">{name}:</div>
                                                <div className="grid grid-cols-2 gap-2 pl-4">
                                                    <div>
                                                        Expected: [P:{result.expected[0]}, R:{result.expected[1]}]
                                                    </div>
                                                    <div>
                                                        Actual: [P:{result.actual[0]}, R:{result.actual[1]}]
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border">
                        <div className="border-b bg-gray-100 px-4 py-3">
                            <h2 className="text-lg font-semibold">Overall Totals Test</h2>
                        </div>

                        <div className="p-4">
                            {testResults.overallTest.passed ? (
                                <div className="flex items-center text-green-600">
                                    <CheckIcon className="mr-2 h-5 w-5" />
                                    <span className="font-medium">
                                        Overall totals match! [P:{testResults.overallTest.expected[0]}, R:
                                        {testResults.overallTest.expected[1]}]
                                    </span>
                                </div>
                            ) : (
                                <div>
                                    <div className="mb-2 flex items-center text-red-600">
                                        <XMarkIcon className="mr-2 h-5 w-5" />
                                        <span className="font-medium">Overall totals don't match!</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pl-7">
                                        <div className="text-sm">
                                            Expected: [P:{testResults.overallTest.expected[0]}, R:
                                            {testResults.overallTest.expected[1]}]
                                        </div>
                                        <div className="text-sm">
                                            Actual: [P:{testResults.overallTest.actual[0]}, R:
                                            {testResults.overallTest.actual[1]}]
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-3 pl-7 text-xs text-gray-500">
                                Note: This test is checking against the expected totals with DLC.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
