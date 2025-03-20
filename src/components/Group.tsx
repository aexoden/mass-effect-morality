import Choice from "./Choice";
import { GroupData } from "../types";

interface GroupProps {
    group: GroupData;
    selectedChoices: Record<string, string>;
    handleOptionSelect: (choiceId: string, optionId: string) => void;
}

export default function Group({
    group,
    selectedChoices,
    handleOptionSelect,
}: GroupProps) {
    return (
        <div className="border-l-4 border-gray-300 pl-4 pt-2 pb-2 my-4">
            <h3 className="font-semibold mb-2">{group.title}</h3>

            {group.description && (
                <p className="text-gray-600 mb-3 italic">{group.description}</p>
            )}

            <div className="space-y-2">
                {group.choices.map(choice => (
                    <Choice
                        key={choice.id}
                        choice={choice}
                        selectedChoices={selectedChoices}
                        handleOptionSelect={handleOptionSelect}
                    />
                ))}
            </div>
        </div>
    );
}
