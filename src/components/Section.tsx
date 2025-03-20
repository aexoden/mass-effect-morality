import Group from "./Group";
import { SectionData } from "../types";

interface SectionProps {
    section: SectionData;
    selectedChoices: Record<string, string>;
    handleOptionSelect: (choiceId: string, optionId: string) => void;
}

export default function Section({ section, selectedChoices, handleOptionSelect }: SectionProps) {
    return (
        <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-3 border-b pb-2 text-xl font-bold">{section.title}</h2>

            {section.description && <p className="mb-4 text-gray-700 italic">{section.description}</p>}

            <div className="space-y-4">
                {section.groups.map((group) => (
                    <Group
                        key={group.id}
                        group={group}
                        selectedChoices={selectedChoices}
                        handleOptionSelect={handleOptionSelect}
                    />
                ))}
            </div>
        </div>
    );
}
