"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ResetAllProps {
  onReset: () => void;
}

/** Danger button gated behind a confirm dialog. */
export function ResetAll({ onReset }: ResetAllProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="danger" size="full">
          Reset all
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset everything to defaults?</DialogTitle>
          <DialogDescription>
            Your images and copy will be cleared. This can&apos;t be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onReset();
              setOpen(false);
            }}
          >
            Reset all
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
