import React from "react";
import { MoralityScores } from "../types";

interface MoralityScoreProps {
    paragonScore: number;
    renegadeScore: number;
}

const MoralityScore: React.FC<MoralityScoreProps> = (scores: MoralityScores) => {
    return (
        <div className="bg-gray-100 mb-8 p-4 rounded-lg shadow">
            <h2 className="font-bold mb-3 text-xl">Current Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Paragon */}
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="font-semibold text-sky-700">Paragon: {scores.paragonScore} points</span>
                    </div>
                    <div className="bg-gray-300 h-4 rounded-full w-full">
                        <div className="bg-sky-600 h-4 rounded-full" style={{ width: `${Math.min(100, Math.round((scores.paragonScore / 629) * 100))}%` }}></div>
                    </div>
                </div>

                {/* Renegade */}
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="font-semibold text-red-700">
                            Renegade: {scores.renegadeScore} points
                        </span>
                    </div>
                    <div className="bg-gray-300 h-4 rounded-full w-full">
                        <div className="bg-red-600 h-4 rounded-full" style={{ width: `${Math.min(100, Math.round((scores.renegadeScore / 629) * 100))}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoralityScore;
