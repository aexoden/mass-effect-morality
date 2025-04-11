import { useState } from "react";
import Group from "./Group";
import SectionSummary from "./SectionSummary";
import { SectionData } from "../types";
import { useSelectedChoices } from "../hooks/useMoralityContext";

interface SectionProps {
    section: SectionData;
}

export default function Section({ section }: SectionProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const selectedChoices = useSelectedChoices();

    const hasSelectedChoices = section.groups.some((group) =>
        group.choices.some((choice) => choice.id in selectedChoices),
    );

    const canCollapse = hasSelectedChoices;

    const toggleExpand = () => {
        if (canCollapse) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-3 border-b pb-2 text-xl font-bold">{section.title}</h2>

            {section.description && <p className="mb-4 text-gray-700 italic">{section.description}</p>}

            <SectionSummary
                section={section}
                isExpanded={isExpanded}
                onToggleExpand={toggleExpand}
            />

            {isExpanded && (
                <div className="space-y-4">
                    {section.groups.map((group) => (
                        <Group
                            key={group.id}
                            group={group}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
