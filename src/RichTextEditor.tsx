import React, { useState} from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState
} from "draft-js";
import "draft-js/dist/Draft.css";
import { Button, Container, Typography, Box } from "@mui/material";

const RichTextEditor: React.FC = () => {

  const loadUserData = (): string => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      return `Name: ${parsedData.name}\nAddress: ${parsedData.address}\nEmail: ${parsedData.email}\nPhone: ${parsedData.phone}`;
    }
    return "No user data available.";
  };

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createWithContent(ContentState.createFromText(loadUserData()));
  });

  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        User Data
      </Typography>
      <Box mb={2}>
        <Button onClick={() => {toggleInlineStyle("BOLD"); }} variant="contained" sx={{ m: 1 }}>
          Bold
        </Button>
        <Button onClick={() => {toggleInlineStyle("ITALIC"); }} variant="contained" sx={{ m: 1 }}>
          Italic
        </Button>
        <Button onClick={() => {toggleInlineStyle("UNDERLINE"); }} variant="contained" sx={{ m: 1 }}>
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
      >
     <Editor
          editorState={editorState}
           onChange={setEditorState}
          handleKeyCommand={RichUtils.handleKeyCommand}
        />
      </Box>
    </Container>
  );
};

export default RichTextEditor;
