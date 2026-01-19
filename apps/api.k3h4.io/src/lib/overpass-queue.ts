const MAX_CONCURRENCY = 1;

type Task = {
    url: string;
    body: string;
    signature: string;
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
};

const queue: Task[] = [];
const inflight = new Map<string, Promise<any>>();
let active = 0;

const pump = () => {
    if (active >= MAX_CONCURRENCY) return;
    const next = queue.shift();
    if (!next) return;
    active += 1;
    void (async () => {
        try {
            const res = await fetch(next.url, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
                body: next.body,
            });
            if (!res.ok) throw new Error(`Overpass ${res.status}`);
            const json = await res.json();
            next.resolve(json);
        } catch (err) {
            next.reject(err);
        } finally {
            inflight.delete(next.signature);
            active -= 1;
            pump();
        }
    })();
};

export function enqueueOverpass(url: string, body: string, signature: string) {
    if (inflight.has(signature)) return inflight.get(signature)!;

    let resolveFn: (value: any) => void;
    let rejectFn: (reason?: any) => void;
    const promise = new Promise<any>((resolve, reject) => {
        resolveFn = resolve;
        rejectFn = reject;
    });

    inflight.set(signature, promise);
    queue.push({ url, body, signature, resolve: resolveFn!, reject: rejectFn! });
    pump();

    return promise;
}
