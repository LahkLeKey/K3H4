import { useEffect, useMemo } from "react";

import { useGeneratePersonaMutation, usePersonaListQuery, type Persona } from "../../hooks/use-persona-queries";
import { personaCompatStore } from "../../stores/persona-compat-store";
import type { GraphEdge, GraphNode } from "./compatibility-canvas";

const golden = (1 + Math.sqrt(5)) / 2;

const getDodecahedronVertices = (radius: number) => {
    const phi = golden;
    const invPhi = 1 / phi;
    const raw: Array<[number, number, number]> = [
        [-1, -1, -1],
        [-1, -1, 1],
        [-1, 1, -1],
        [-1, 1, 1],
        [1, -1, -1],
        [1, -1, 1],
        [1, 1, -1],
        [1, 1, 1],
        [0, -invPhi, -phi],
        [0, -invPhi, phi],
        [0, invPhi, -phi],
        [0, invPhi, phi],
        [-invPhi, -phi, 0],
        [-invPhi, phi, 0],
        [invPhi, -phi, 0],
        [invPhi, phi, 0],
        [-phi, 0, -invPhi],
        [-phi, 0, invPhi],
        [phi, 0, -invPhi],
        [phi, 0, invPhi],
    ];
    return raw.map(([x, y, z]) => {
        const mag = Math.hypot(x, y, z) || 1;
        const scale = radius / mag;
        return [x * scale, y * scale, z * scale] as [number, number, number];
    });
};

const buildNodePositions = (personas: Persona[]) => {
    const count = Math.max(personas.length, 1);
    const radius = Math.max(6, count * 0.55);
    const vertices = getDodecahedronVertices(radius);
    return personas.map((persona, index) => {
        const v = vertices[index % vertices.length];
        return { ...persona, position: [v[0], v[1], v[2]] as [number, number, number] } satisfies GraphNode;
    });
};

export function usePersonaCompatibility(apiBase: string) {
    const personasQuery = usePersonaListQuery(apiBase);
    const generatePersona = useGeneratePersonaMutation(apiBase);
    const {
        personas,
        compatibilities,
        confusion,
        loadingPersonas,
        loadingCompatibility,
        loadingConfusion,
        errors,
        autoRecomputeLocked,
        compatibilityAttempted,
        lastCompatibilityLoad,
        loadPersonas,
        loadCompatibility,
        recomputeCompatibility,
        runConfusion,
        markAutoRecompute,
    } = personaCompatStore.useShallow((state) => ({
        personas: state.personas,
        compatibilities: state.compatibilities,
        confusion: state.confusion,
        loadingPersonas: state.loadingPersonas,
        loadingCompatibility: state.loadingCompatibility,
        loadingConfusion: state.loadingConfusion,
        errors: state.errors,
        autoRecomputeLocked: state.autoRecomputeLocked,
        compatibilityAttempted: state.compatibilityAttempted,
        lastCompatibilityLoad: state.lastCompatibilityLoad,
        loadPersonas: state.loadPersonas,
        loadCompatibility: state.loadCompatibility,
        recomputeCompatibility: state.recomputeCompatibility,
        runConfusion: state.runConfusion,
        markAutoRecompute: state.markAutoRecompute,
    }));

    useEffect(() => {
        if (!personas.length && !loadingPersonas && !errors.personas) {
            void loadPersonas(apiBase);
        }
    }, [apiBase, personas.length, loadingPersonas, errors.personas, loadPersonas]);

    useEffect(() => {
        if (!personasQuery.data) return;
        const latest = personasQuery.data;
        personaCompatStore.setState((state) => {
            const prev = state.personas;
            const sameLength = prev.length === latest.length;
            const sameContent = sameLength && prev.every((p, idx) => {
                const next = latest[idx];
                if (!next) return false;
                if (p.id !== next.id) return false;
                if (p.updatedAt && next.updatedAt) return p.updatedAt === next.updatedAt;
                return (
                    p.alias === next.alias &&
                    p.account === next.account &&
                    (p.handle ?? "") === (next.handle ?? "") &&
                    (p.note ?? "") === (next.note ?? "")
                );
            });

            if (sameContent) return state;

            const personasChanged = !sameContent;
            return {
                ...state,
                personas: latest,
                lastPersonasLoad: Date.now(),
                ...(personasChanged
                    ? {
                        compatibilities: [],
                        compatibilityAttempted: false,
                        autoRecomputeLocked: false,
                        lastCompatibilityLoad: 0,
                        lastCompatibilityRequest: 0,
                    }
                    : {}),
            };
        });
    }, [personasQuery.data]);

    useEffect(() => {
        if (loadingCompatibility) return;
        if (personas.length < 2) return;
        const personaIds = new Set(personas.map((p) => p.id));
        const edgeCoverage = new Set<string>();
        for (const edge of compatibilities) {
            edgeCoverage.add(edge.sourceId);
            edgeCoverage.add(edge.targetId);
        }
        const missingPersona = Array.from(personaIds).some((id) => !edgeCoverage.has(id));
        if (compatibilities.length === 0 || missingPersona) {
            void recomputeCompatibility(apiBase);
        }
    }, [apiBase, personas, compatibilities, loadingCompatibility, recomputeCompatibility]);

    useEffect(() => {
        if (loadingCompatibility) return;
        if (errors.compatibility) return;
        if (personas.length < 2) return;
        if (compatibilities.length > 0) return;
        personaCompatStore.setState({ lastCompatibilityRequest: 0 });
        void recomputeCompatibility(apiBase);
    }, [apiBase, personas.length, compatibilities.length, loadingCompatibility, errors.compatibility, recomputeCompatibility]);

    useEffect(() => {
        if (loadingCompatibility || errors.compatibility) return;
        if (!personas.length) return;
        if (compatibilities.length > 0) return;
        if (compatibilityAttempted) return;
        if (lastCompatibilityLoad && Date.now() - lastCompatibilityLoad < 10_000) return;
        void loadCompatibility(apiBase);
    }, [apiBase, personas.length, compatibilities.length, loadingCompatibility, errors.compatibility, compatibilityAttempted, lastCompatibilityLoad, loadCompatibility]);

    useEffect(() => {
        if (autoRecomputeLocked) return;
        if (loadingCompatibility || errors.compatibility) return;
        if (compatibilityAttempted) return;
        if (personas.length > 1 && compatibilities.length === 0) {
            markAutoRecompute();
            void recomputeCompatibility(apiBase);
        }
    }, [apiBase, personas.length, compatibilities.length, loadingCompatibility, errors.compatibility, compatibilityAttempted, autoRecomputeLocked, markAutoRecompute, recomputeCompatibility]);

    const nodes = useMemo<GraphNode[]>(() => buildNodePositions(personas), [personas]);
    const edges = useMemo<GraphEdge[]>(
        () => compatibilities.map((compat) => ({
            id: compat.id,
            sourceId: compat.sourceId,
            targetId: compat.targetId,
            score: Number.isFinite(compat.jaccardScore) ? compat.jaccardScore : 0,
        })),
        [compatibilities],
    );

    const personaIndex = useMemo(() => Object.fromEntries(personas.map((p) => [p.id, p])), [personas]);

    const labeledPairs = useMemo(() => compatibilities.map((compat) => ({
        sourceId: compat.sourceId,
        targetId: compat.targetId,
        label: (compat.overlappingTokens?.length ?? 0) > 0,
    })), [compatibilities]);

    const maxConfusionPairs = 2000;
    const confusionPairs = useMemo(() => labeledPairs.slice(0, maxConfusionPairs), [labeledPairs]);
    const trimmedPairs = Math.max(0, labeledPairs.length - confusionPairs.length);

    const confusionCounts = confusion?.counts ?? { tp: 0, fp: 0, tn: 0, fn: 0 };
    const confusionMetrics = confusion?.metrics ?? { accuracy: 0, precision: 0, recall: 0, f1: 0 };
    const details = useMemo(() => confusion?.details ?? [], [confusion]);
    const probabilities = useMemo(() => details.map((d) => d.probability), [details]);

    return {
        personas,
        compatibilities,
        confusion,
        loadingPersonas,
        loadingCompatibility,
        loadingConfusion,
        errors,
        autoRecomputeLocked,
        compatibilityAttempted,
        lastCompatibilityLoad,
        loadCompatibility,
        recomputeCompatibility,
        runConfusion,
        generatePersona,
        nodes,
        edges,
        personaIndex,
        labeledPairs,
        confusionPairs,
        maxConfusionPairs,
        trimmedPairs,
        confusionCounts,
        confusionMetrics,
        details,
        probabilities,
    } as const;
}
