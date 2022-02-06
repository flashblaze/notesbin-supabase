import Highlight from "react-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { useEffect } from "react";
import { Box, SkeletonText, useToast } from "@chakra-ui/react";

import { useNoteStore } from "../store/index";
import Layout from "../components/Layout";
import SEO from "./seo";
import supabase from "../utils/supabaseClient";

export const getServerSideProps = async ({ query }) => {
  try {
    const res = await supabase.from("notesbin").select().match({ uuid: query.id });
    return {
      props: {
        note: res.data[0].note,
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

const Post = ({ note, err, message }) => {
  const { setNote } = useNoteStore();
  const toast = useToast();

  useEffect(() => {
    if (note) {
      setNote(note);
    } else if (err) {
      toast({
        title: message,
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  }, []);

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
          <Highlight className="autodetect">{note}</Highlight>
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
