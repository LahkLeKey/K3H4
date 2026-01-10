import { Button } from "../../ui/button";
import { FieldRow } from "../../ui/field-row";
import { FormActions } from "../../ui/form-actions";
import { HudSelect } from "../../ui/hud-select";
import { Input } from "../../ui/input";
import { LabeledField } from "../../ui/labeled-field";

export type WorkersActionProps = {
    taskTitle: string;
    dueDate: string;
    assignee: string;
    assigneeOptions: string[];
    busy?: boolean;
    onTaskTitleChange: (value: string) => void;
    onDueDateChange: (value: string) => void;
    onAssigneeChange: (value: string) => void;
    onConfirm: () => void;
};

export function WorkersActionForm({
    taskTitle,
    dueDate,
    assignee,
    assigneeOptions,
    busy,
    onTaskTitleChange,
    onDueDateChange,
    onAssigneeChange,
    onConfirm,
}: WorkersActionProps) {
    return (
        <FieldRow>
            <LabeledField label="Task title" className="sm:col-span-2">
                <Input value={taskTitle} onChange={(e) => onTaskTitleChange(e.target.value)} />
            </LabeledField>
            <LabeledField label="Due date">
                <Input type="date" value={dueDate} onChange={(e) => onDueDateChange(e.target.value)} />
            </LabeledField>
            <LabeledField label="Assignee">
                <HudSelect value={assignee} onChange={(e) => onAssigneeChange(e.target.value)}>
                    {assigneeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </HudSelect>
            </LabeledField>
            <FormActions note="Creates a task for workers and opens roster.">
                <Button size="sm" onClick={onConfirm} disabled={busy}>Schedule crew</Button>
            </FormActions>
        </FieldRow>
    );
}
