import Choice from "./Choice";
import { GroupData } from "../types";

interface GroupProps {
    group: GroupData;
}

export default function Group({ group }: GroupProps) {
    return (
        <div className="my-4 border-l-4 border-gray-300 pt-2 pb-2 pl-4">
            <h3 className="mb-2 font-semibold">{group.title}</h3>

            {group.description && <p className="mb-3 text-gray-600 italic">{group.description}</p>}

            <div className="space-y-2">
                {group.choices.map((choice) => (
                    <Choice
                        key={choice.id}
                        choice={choice}
                    />
                ))}
            </div>
        </div>
    );
}
