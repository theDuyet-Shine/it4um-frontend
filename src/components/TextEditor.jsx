import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import storage from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const TextEditor = () => {
  const quillRef = useRef(null);
  const [inputData, setInputData] = useState("");

  const handleUploadImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            quill.insertEmbed(range.index, "image", downloadURL);
          }
        );
      }
    };
  };

  const handleLogContent = () => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const htmlContent = quill.root.innerHTML;
      console.log(htmlContent);
    }
  };
  const handleTextInputChange = (e) => {
    setInputData(e.target.value);
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleUploadImage,
      },
    },
  };

  return (
    <div>
      <label>
        Title
        <input type="text" onChange={handleTextInputChange}></input>
      </label>
      <div
        className="flex items-center justify-center"
        style={{ height: "500px" }}
      >
        <ReactQuill ref={quillRef} theme="snow" modules={modules} />
        <button onClick={handleLogContent}>Click me</button>
      </div>
    </div>
  );
};

export default TextEditor;
