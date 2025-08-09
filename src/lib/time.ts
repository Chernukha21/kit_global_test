import { Timestamp } from "firebase/firestore";

export function tsToISO(ts?: Timestamp | Date | string | null): string | null {
    if (!ts) return null;

    if (ts instanceof Timestamp) {
        return ts.toDate().toISOString();
    }

    if (ts instanceof Date) {
        return ts.toISOString();
    }

    return null;
}

type WithCreatedFields = {
    createdAt?: Timestamp | Date | string | null;
    createdAtClient?: Timestamp | Date | string | null;
};

export function pickCreatedISO(x: WithCreatedFields): string {
    return (
        tsToISO(x.createdAt) ??
        tsToISO(x.createdAtClient) ??
        new Date(0).toISOString()
    );
}