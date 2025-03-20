import Group from "./Group";
import { SectionData } from "../types";

interface SectionProps {
    section: SectionData;
    selectedChoices: Record<string, string>;
    handleOptionSelect: (choiceId: string, optionId: string) => void;
}

export default function Section({
    section,
    selectedChoices,
    handleOptionSelect,
}: SectionProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="border-b font-bold mb-3 pb-2 text-xl">{section.title}</h2>

            {section.description && (
                <p className="italic mb-4 text-gray-700">{section.description}</p>
            )}

            <div className="space-y-4">
                {section.groups.map(group => (
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
};
