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
        <div className="mb-8 rounded-lg bg-gray-100 p-4 shadow">
            <h2 className="mb-3 text-xl font-bold">Current Status</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <div className="mb-1 flex justify-between">
                        <span className="font-semibold text-sky-700">Paragon: {scores.paragon} points</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-300">
                        <div
                            className="h-4 rounded-full bg-sky-600"
                            style={{ width: `${paragonPercentage.toString()}%` }}
                        ></div>
                    </div>
                </div>

                <div>
                    <div className="mb-1 flex justify-between">
                        <span className="font-semibold text-red-700">Renegade: {scores.renegade} points</span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-300">
                        <div
                            className="h-4 rounded-full bg-red-600"
                            style={{ width: `${renegadePercentage.toString()}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MoralityScoreWidget({ scores, paragonMax, renegadeMax }: MoralityScoreProps) {
    const paragonPercentage = Math.min(100, Math.round((scores.paragon / paragonMax) * 100));
    const renegadePercentage = Math.min(100, Math.round((scores.renegade / renegadeMax) * 100));

    return (
        <div className="fixed right-4 bottom-4 z-50 w-64 rounded-lg bg-gray-800 p-3 text-white shadow-lg">
            <h3 className="mb-2 text-center text-lg font-bold">Current Scores</h3>

            <div className="mb-2">
                <div className="mb-1 flex justify-between">
                    <span className="font-semibold text-sky-400">Paragon: {scores.paragon}</span>
                    <span className="font-semibold text-sky-400">{paragonPercentage}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-600">
                    <div
                        className="h-3 rounded-full bg-sky-500"
                        style={{ width: `${paragonPercentage.toString()}%` }}
                    ></div>
                </div>
            </div>

            <div className="mb-2">
                <div className="mb-1 flex justify-between">
                    <span className="font-semibold text-red-400">Renegade: {scores.renegade}</span>
                    <span className="font-semibold text-red-400">{renegadePercentage}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-600">
                    <div
                        className="h-3 rounded-full bg-red-500"
                        style={{ width: `${renegadePercentage.toString()}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
