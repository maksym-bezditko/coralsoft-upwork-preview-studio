/**
 * Image persistence, kept out of `localStorage`.
 *
 * Dropped images are stored at their original resolution and encoding, so a
 * single 4K screenshot can be tens of megabytes as a data URL — far past the
 * ~5 MB `localStorage` quota that used to force a downscale + re-encode on
 * import. IndexedDB has no such ceiling (browsers grant a share of free disk),
 * so the editor can keep the bytes exactly as they were uploaded and let the
 * 2× export be the only place resolution is ever decided.
 *
 * Every call is best-effort: private-browsing modes and blocked storage make
 * IndexedDB throw or hang, and a failure here should cost persistence, never
 * the session. Reads resolve to null, writes resolve silently.
 */

const DB_NAME = "coralsoft-preview-studio";
const DB_VERSION = 1;
const STORE = "images";

/** Keys are namespaced per studio so the two never collide. */
export const IMAGE_KEYS = {
  portrait: "upwork:portrait",
  screens: ["upwork:screen:0", "upwork:screen:1", "upwork:screen:2"],
  caseScreenshot: "cases:screenshot",
  casePortrait: "cases:portrait",
  catalogPortrait: "catalog:portrait",
} as const;

let dbPromise: Promise<IDBDatabase | null> | null = null;

function openDB(): Promise<IDBDatabase | null> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve) => {
    if (typeof indexedDB === "undefined") {
      resolve(null);
      return;
    }
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(STORE)) {
          request.result.createObjectStore(STORE);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
      request.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return dbPromise;
}

/**
 * Last value written per key, so re-renders that don't touch an image don't
 * re-serialize megabytes into IndexedDB. Seeded by reads as well as writes.
 */
const lastWritten = new Map<string, string | null>();

export async function getImage(key: string): Promise<string | null> {
  const db = await openDB();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const request = db.transaction(STORE, "readonly").objectStore(STORE).get(key);
      request.onsuccess = () => {
        const value = typeof request.result === "string" ? request.result : null;
        lastWritten.set(key, value);
        resolve(value);
      };
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

/** Writes the data URL under `key`; a null value deletes the entry. */
export async function putImage(key: string, value: string | null): Promise<void> {
  if (lastWritten.get(key) === value) return;
  lastWritten.set(key, value);
  const db = await openDB();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const store = db.transaction(STORE, "readwrite").objectStore(STORE);
      const request = value === null ? store.delete(key) : store.put(value, key);
      request.onsuccess = () => resolve();
      request.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}
