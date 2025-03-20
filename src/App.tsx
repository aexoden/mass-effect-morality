import "./App.css";
import MoralityCalculator from "./components/MoralityCalculator";

export default function App() {
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="@container mx-auto px-4">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Mass Effect Morality Planner</h1>
                    <p className="mt-2 text-gray-600">Plan your character's choices and track morality points</p>
                </header>

                <MoralityCalculator />

                <footer className="mt-12 pb-4 text-center text-sm text-gray-600">
                    <p>
                        Based on the{" "}
                        <a href="https://masseffect.fandom.com/wiki/Morality_Guide">Mass Effect Wiki Morality Guide</a>.
                    </p>
                    <p className="mt-1">This is a fan project and is not affiliated with EA or BioWare.</p>
                </footer>
            </div>
        </div>
    );
}
