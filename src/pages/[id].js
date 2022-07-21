import "highlight.js/styles/atom-one-dark.css";
import { useEffect } from "react";
import { Box, SkeletonText, useToast } from "@chakra-ui/react";

import { useNoteStore } from "../store/index";
import Layout from "../components/Layout";
import SEO from "./seo";
import supabase from "../utils/supabaseClient";
import shallow from "zustand/shallow";

export const getServerSideProps = async ({ query }) => {
  const hljs = require("highlight.js");
  try {
    const res = await supabase.from("notesbin").select().match({ uuid: query.id });
    return {
      props: {
        rawNote: res.data[0].note,
        note: hljs.highlightAuto(res.data[0].note).value,
      },
    };
  } catch (err) {
    return {
      props: {
        err: true,
        message: err.message,
      },
    };
  }
};

const Post = ({ rawNote, note, err, message }) => {
  const { setNote, setRawNote } = useNoteStore(
    (state) => ({ setNote: state.setNote, setRawNote: state.setRawNote }),
    shallow
  );
  const toast = useToast();

  useEffect(() => {
    if (note && rawNote) {
      setRawNote(rawNote);
      setNote(note);
    } else if (err) {
      toast({
        title: message,
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  }, [note, rawNote, err]);

  return (
    <Layout>
      <SEO slug="id" description="id" />
      <Box
        sx={{
          color: "#fff",
          marginLeft: "0.5rem",
          overflowY: "auto",
          height: "calc(100vh - 77px - 1rem)",
          paddingBottom: "10px",
          width: "100%",
        }}>
        {!err && note && note.length !== 0 ? (
          <pre dangerouslySetInnerHTML={{ __html: note }} />
        ) : err ? (
          <span />
        ) : (
          <SkeletonText
            mt="4"
            noOfLines={4}
            spacing="4"
            color="#FFFFFF"
            width={[200, 200, 500, 500]}
          />
        )}
      </Box>
    </Layout>
  );
};

export default Post;
