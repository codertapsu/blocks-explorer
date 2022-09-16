import { Button } from '@mui/material';
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from 'usehooks-ts';
import Editor from "@monaco-editor/react";

interface IProps {
  block: any;
}

export const BlockRaw: React.FC<IProps> = (props) => {
  const history = useNavigate();
  const darkMode = useDarkMode();
  const { block } = props;

  return (
    <div style={{ margin: "0px -25px 0px -25px" }}>
      <Button
        onClick={() => {
          history(`/block/${block.hash}`);
        }}
        style={{ position: "absolute", right: "10px", top: "75px", zIndex: 1 }}
      >View Block</Button>
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
          wordWrap: "on",
          lineNumbers: "off",
          wrappingIndent: "deepIndent",
          readOnly: true,
          showFoldingControls: "always",
        }}
        theme={darkMode.isDarkMode ? "dark" : "light"}
        width="100vw"
        height="93vh"
        language="json"
        value={JSON.stringify(block, null, 4)}
      />
    </div>
  );
};
