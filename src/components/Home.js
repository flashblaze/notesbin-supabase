import { useEffect, useRef } from "react";
import { Textarea } from "@chakra-ui/react";

import { useNoteStore } from "../store/index";
import shallow from "zustand/shallow";

const Home = () => {
  const textArea = useRef();
  const { setNote, note, isSaving } = useNoteStore(
    (state) => ({
      setNote: state.setNote,
      note: state.note,
      isSaving: state.isSaving,
    }),
    shallow
  );

  useEffect(() => {
    textArea.current.focus();
  }, []);

  return (
    <Textarea
      color="#FFFFFF"
      disabled={isSaving}
      h="calc(100vh-77px)"
      resize="none"
      border="none"
      _focus={{ border: "none", boxShadow: "none" }}
      onChange={(e) => setNote(e.target.value)}
      value={note}
      ref={textArea}
      spellCheck={false}
      placeholder="Start typing..."
    />
  );
};

export default Home;
