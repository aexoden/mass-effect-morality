import { MoralityScores } from "../types";

interface MoralityScoreProps {
    scores: MoralityScores;
    paragonMax: number;
    renegadeMax: number;
}

export default function MoralityScore({ scores, paragonMax, renegadeMax }: MoralityScoreProps) {
    const paragonPercentage = Math.min(100, Math.round((scores.paragon / paragonMax) * 100));
    const renegadePercentage = Math.min(100, Math.round((scores.renegade / renegadeMax) * 100));

    return (
        <div className="bg-gray-100 mb-8 p-4 rounded-lg shadow">
            <h2 className="font-bold mb-3 text-xl">Current Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="font-semibold text-sky-700">Paragon: {scores.paragon} points</span>
                    </div>
                    <div className="bg-gray-300 h-4 rounded-full w-full">
                        <div className="bg-sky-600 h-4 rounded-full" style={{ width: `${paragonPercentage.toString()}%` }}></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-1">
                        <span className="font-semibold text-red-700">
                            Renegade: {scores.renegade} points
                        </span>
                    </div>
                    <div className="bg-gray-300 h-4 rounded-full w-full">
                        <div className="bg-red-600 h-4 rounded-full" style={{ width: `${renegadePercentage.toString()}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function MoralityScoreWidget({ scores, paragonMax, renegadeMax }: MoralityScoreProps) {
    const paragonPercentage = Math.min(100, Math.round((scores.paragon / paragonMax) * 100));
    const renegadePercentage = Math.min(100, Math.round((scores.renegade / renegadeMax) * 100));

    return (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg z-50 w-64">
            <h3 className="text-lg font-bold mb-2 text-center">Current Scores</h3>

            <div className="mb-2">
                <div className="flex justify-between mb-1">
                    <span className="font-semibold text-sky-400">Paragon: {scores.paragon}</span>
                    <span className="font-semibold text-sky-400">{paragonPercentage}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3">
                    <div
                        className="bg-sky-500 h-3 rounded-full"
                        style={{ width: `${paragonPercentage.toString()}%` }}
                    >
                    </div>
                </div>
            </div>

            <div className="mb-2">
                <div className="flex justify-between mb-1">
                    <span className="font-semibold text-red-400">Renegade: {scores.renegade}</span>
                    <span className="font-semibold text-red-400">{renegadePercentage}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3">
                    <div
                        className="bg-red-500 h-3 rounded-full"
                        style={{ width: `${renegadePercentage.toString()}%` }}
                    >
                    </div>
                </div>
            </div>
        </div>
    );
};
