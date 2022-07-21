import create from "zustand";
import { combine } from "zustand/middleware";

export const useNoteStore = create(
  combine({ note: "", isSaving: false, doesSavedNoteExists: false, rawNote: "" }, (set) => ({
    setNote: (note) => set(() => ({ note })),
    setRawNote: (rawNote) => set(() => ({ rawNote })),
    setIsSaving: (isSaving) => set(() => ({ isSaving })),
    setDoesSavedNoteExists: (doesSavedNoteExists) => set(() => ({ doesSavedNoteExists })),
  }))
);
