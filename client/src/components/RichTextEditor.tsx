import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  initialContent: string;
  onContentChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent,
  onContentChange,
}) => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <ReactQuill
        theme="snow"
        value={initialContent} // controlled by the parent component
        onChange={onContentChange} // notifies the parent of changes
        modules={modules}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
          "video",
        ]}
      />
    </div>
  );
};

export default RichTextEditor;

//EXAMPLE USAGE
// import React, { useState } from "react";
// import RichTextEditor from "./RichTextEditor";
// const App: React.FC = () => {
//   const [content, setContent] = useState("<p>Initial content</p>");
//   const handleContentChange = (newContent: string) => {
//     setContent(newContent);
//   };
//   return (
//     <div className="App">
//       <h1>Rich Text Editor Example</h1>
//       <RichTextEditor
//         initialContent={content}
//         onContentChange={handleContentChange}
//       />
//       <div className="mt-4">
//         <h2>Output:</h2>
//         <div
//           className="output"
//           dangerouslySetInnerHTML={{ __html: content }}
//         />
//       </div>
//     </div>
//   );
// };
// export default App;

// Note: The example usage is commented out. You can uncomment it to test the RichTextEditor component in a React application.
