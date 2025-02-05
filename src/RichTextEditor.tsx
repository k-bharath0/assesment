import React, { useState, useEffect, useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  ContentState
} from "draft-js";
import "draft-js/dist/Draft.css";
import { Button, Container, Typography, Box } from "@mui/material";

const RichTextEditor: React.FC = () => {
    const editorRef = useRef<any>(null); 

  const loadUserData = (): string => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      return `Name: ${parsedData.name}\nAddress: ${parsedData.address}\nEmail: ${parsedData.email}\nPhone: ${parsedData.phone}`;
    }
    return "No user data available.";
  };

  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      try {
        return EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)));
      } catch (error) {
        console.error("Error parsing saved content, resetting:", error);
        return EditorState.createWithContent(ContentState.createFromText(loadUserData()));
      }
    }
    return EditorState.createWithContent(ContentState.createFromText(loadUserData()));
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const userData = loadUserData();
      setEditorState(EditorState.createWithContent(ContentState.createFromText(userData)));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const focusEditor = () => {
    editorRef.current?.focus();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        User Data
      </Typography>
      <Box mb={2}>
        <Button onClick={() => { focusEditor(); toggleInlineStyle("BOLD"); }} variant="contained" sx={{ m: 1 }}>
          Bold
        </Button>
        <Button onClick={() => { focusEditor(); toggleInlineStyle("ITALIC"); }} variant="contained" sx={{ m: 1 }}>
          Italic
        </Button>
        <Button onClick={() => { focusEditor(); toggleInlineStyle("UNDERLINE"); }} variant="contained" sx={{ m: 1 }}>
          Underline
        </Button>
      </Box>
      <Box
        sx={{
          border: "1px solid gray",
          padding: "10px",
          minHeight: "150px",
          cursor: "text",
          borderRadius: "5px",
          backgroundColor: "white",
        }}
        onClick={focusEditor}
      >
     <Editor ref={(ref: any) => (editorRef.current = ref)}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={RichUtils.handleKeyCommand}
        />
      </Box>
    </Container>
  );
};

export default RichTextEditor;
