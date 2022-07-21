import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import shallow from "zustand/shallow";

import { useNoteStore } from "../store/index";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const { setNote, setIsSaving } = useNoteStore(
    (state) => ({
      setNote: state.setNote,
      setIsSaving: state.setIsSaving,
    }),
    shallow
  );

  const handleHeader = () => {
    setNote("");
    setIsSaving(false);
  };

  return (
    <Flex direction="column">
      <Box
        bg="#101010"
        w="100%"
        p={4}
        color="white"
        fontFamily="Monda"
        d="flex"
        alignItems="center">
        <Link href="/">
          <a>
            <Text ml="20" cursor="pointer" fontSize="3xl" userSelect="none" onClick={handleHeader}>
              notesbin
            </Text>
          </a>
        </Link>
      </Box>
      <Flex>
        <Sidebar />
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
