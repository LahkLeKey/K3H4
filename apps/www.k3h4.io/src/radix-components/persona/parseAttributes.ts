export const parseAttributes = (input: string) =>
    input
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const [main, weightToken] = line.split("|").map((token) => token.trim());
            const [categoryRaw, valuesRaw] = (main.includes(":") ? main.split(":") : main.split("=")).map((token) => token.trim());
            const category = categoryRaw?.toLowerCase();
            const values = (valuesRaw || "")
                .split(/[;,]/)
                .map((value) => value.trim())
                .filter(Boolean);
            if (!category || values.length === 0) return null;
            const weight = weightToken ? Number(weightToken.replace(/[^0-9.-]/g, "")) : undefined;
            return { category, values, weight: Number.isFinite(weight) ? weight : undefined } as {
                category: string;
                values: string[];
                weight?: number;
            };
        })
        .filter(Boolean) as { category: string; values: string[]; weight?: number }[];
