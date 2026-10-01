"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Archived layouts, per studio.
 *
 * Kept in its own localStorage slot rather than inside the editor state on
 * purpose: "Reset all" restores the editor to its defaults, and that should
 * clear the copy and images, not resurrect every layout the team has decided
 * it doesn't use.
 */
function storageKey(studio: string): string {
  return `coralsoft-archived-layouts-${studio}`;
}

function read(studio: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey(studio));
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function write(studio: string, ids: string[]): void {
  try {
    window.localStorage.setItem(storageKey(studio), JSON.stringify(ids));
  } catch {
    /* storage unavailable — non-fatal */
  }
}

export interface ArchiveApi<T extends string> {
  archived: T[];
  archive: (id: T) => void;
  restore: (id: T) => void;
}

/**
 * The set of archived layout ids for one studio. Starts empty so the server and
 * first client paint match, then hydrates from localStorage after mount.
 */
export function useArchive<T extends string>(studio: string): ArchiveApi<T> {
  const [archived, setArchived] = useState<T[]>([]);

  useEffect(() => {
    setArchived(read(studio) as T[]);
  }, [studio]);

  const archive = useCallback(
    (id: T) => {
      setArchived((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        write(studio, next);
        return next;
      });
    },
    [studio],
  );

  const restore = useCallback(
    (id: T) => {
      setArchived((prev) => {
        const next = prev.filter((x) => x !== id);
        write(studio, next);
        return next;
      });
    },
    [studio],
  );

  return { archived, archive, restore };
}

/**
 * Keeps the selected layout on a visible tile: when the current one gets
 * archived, selection moves to the first layout still on the board.
 */
export function useKeepSelectionVisible<T extends string>(
  defs: readonly { id: T }[],
  archived: T[],
  value: T,
  onChange: (id: T) => void,
): void {
  useEffect(() => {
    if (!archived.includes(value)) return;
    const first = defs.find((d) => !archived.includes(d.id));
    if (first) onChange(first.id);
  }, [defs, archived, value, onChange]);
}
