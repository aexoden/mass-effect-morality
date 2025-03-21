import Group from "./Group";
import { SectionData } from "../types";

interface SectionProps {
    section: SectionData;
}

export default function Section({ section }: SectionProps) {
    return (
        <div className="rounded-lg bg-white p-4 shadow">
            <h2 className="mb-3 border-b pb-2 text-xl font-bold">{section.title}</h2>

            {section.description && <p className="mb-4 text-gray-700 italic">{section.description}</p>}

            <div className="space-y-4">
                {section.groups.map((group) => (
                    <Group
                        key={group.id}
                        group={group}
                    />
                ))}
            </div>
        </div>
    );
}
