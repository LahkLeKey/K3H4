// Simple FIFO queue + coalescing for Overpass POST requests.
// Identical query strings share one in-flight request; requests execute one at a time.

type Task = {
    signature: string;
    query: string;
    resolve: (val: any) => void;
    reject: (err: any) => void;
};

const queue: Task[] = [];
const inFlight = new Map<string, Promise<any>>();
let running = false;

const runNext = () => {
    if (running) return;
    const next = queue.shift();
    if (!next) return;
    running = true;
    const { signature, query, resolve, reject } = next;

    const p = fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
        body: new URLSearchParams({ data: query }).toString(),
    })
        .then(async (res) => {
            if (!res.ok) throw new Error(`Overpass ${res.status}`);
            return await res.json();
        })
        .then((val) => {
            resolve(val);
            inFlight.delete(signature);
        })
        .catch((err) => {
            reject(err);
            inFlight.delete(signature);
        })
        .finally(() => {
            running = false;
            runNext();
        });

    inFlight.set(signature, p);
};

export const enqueueOverpass = (query: string) => {
    const signature = query;
    if (inFlight.has(signature)) return inFlight.get(signature)!;

    const promise = new Promise<any>((resolve, reject) => {
        queue.push({ signature, query, resolve, reject });
        runNext();
    });

    inFlight.set(signature, promise);
    return promise;
};