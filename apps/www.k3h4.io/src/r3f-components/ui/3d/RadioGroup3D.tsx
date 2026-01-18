import { Html3D } from "./Html3D";

export type RadioOption3D = {
    key: string;
    label: string;
    description?: string;
};

export type RadioGroup3DProps = {
    position?: [number, number, number];
    name: string;
    options: RadioOption3D[];
    value?: string;
    onValueChange?: (key: string) => void;
    className?: string;
};

export function RadioGroup3D({ position = [0, 1.1, 0], name, options, value, onValueChange, className = "" }: RadioGroup3DProps) {
    return (
        <Html3D position={position} distanceFactor={9}>
            <div className={`flex flex-col gap-2 ${className}`.trim()}>
                {options.map((opt) => (
                    <label key={opt.key} className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 shadow-md backdrop-blur">
                        <input
                            type="radio"
                            name={name}
                            value={opt.key}
                            checked={value === opt.key}
                            onChange={() => onValueChange?.(opt.key)}
                            className="mt-1 h-4 w-4 accent-emerald-300"
                        />
                        <span className="flex flex-col">
                            <span className="font-semibold text-white">{opt.label}</span>
                            {opt.description ? <span className="text-xs text-slate-400">{opt.description}</span> : null}
                        </span>
                    </label>
                ))}
            </div>
        </Html3D>
    );
}
