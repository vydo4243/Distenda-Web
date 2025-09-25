import { Editor } from "@tinymce/tinymce-react";
import React from "react";

import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";

function EditableDetail({ id, title, value, onChange, editorRef }) {
  return (
    <div className="mt-6">
      <div className="md:text-[1.25rem] text-[1rem] mb-2 font-semibold text-neutral-900 text-opacity-50 leading-none max-md:max-w-full">
        {title}
      </div>
      <Editor
        id={id}
        apiKey="ra8co6ju1rrspizsq3cqhi3e8p7iknltlh2v77d58cbrys8m"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        value={value} // Giá trị hiện tại
        onEditorChange={onChange} // Hàm xử lý khi nội dung thay đổi
        init={{
          height: 300, // Chiều cao của editor
          menubar: false, // Ẩn thanh menu
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
}

function ContentSection({
  exercise,
  editorRef,
  handleChange,
  handleEditorChange,
  handleCodeChange,
  handleTestCaseChange,
  addTestCase,
}) {
  return (
    <>
      <div className="flex flex-col mt-2 w-full max-md:max-w-full">
        {/* Tiêu đề */}
        <div className="md:text-[1.25rem] text-[1rem] mb-2 font-semibold text-neutral-900 text-opacity-50 leading-none max-md:max-w-full">
          Tên bài tập
        </div>

        {/* Nội dung */}
        <input
          required
          id="ExerciseName"
          type="text"
          value={exercise?.ExerciseName}
          onChange={handleChange}
          className="w-full px-3  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 min-h-[3.75rem] max-md:min-h-[2.75rem] focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col mt-2 w-full max-md:max-w-full">
        {/* Tiêu đề */}
        <div className="md:text-[1.25rem] text-[1rem] mb-2 font-semibold text-neutral-900 text-opacity-50 leading-none max-md:max-w-full">
          Ngôn ngữ
        </div>

        {/* Nội dung */}
        <select
          required
          id="ExerciseLanguage"
          value={exercise?.ExerciseLanguage}
          onChange={handleChange}
          className="w-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 min-h-[3.75rem] max-md:min-h-[2.75rem] focus:ring-blue-500"
        >
          <option value="python3">Python 3</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="php">PHP</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      <div className="">
        <EditableDetail
          id="ExerciseQuestion"
          title="Đề bài"
          value={exercise?.ExerciseQuestion}
          onChange={handleEditorChange}
          editorRef={editorRef}
        />

        <div className="mt-6 md:text-[1.25rem] text-[1rem] mb-2 font-semibold text-neutral-900 text-opacity-50 leading-none max-md:max-w-full">
          Template mẫu
        </div>
        <CodeMirror
          value={exercise?.ExerciseSample}
          options={{
            theme: "default",
            lineNumbers: true,
          }}
          onChange={handleCodeChange}
        />
        {/* <EditableDetail
          id="ExerciseAnswer"
          title="Đáp án"
          value={exercise?.ExerciseAnswer}
          onChange={handleEditorChange}
          editorRef={editorRef}
        /> */}
        {/* <div className="mt-6 md:text-[1.25rem] text-[1rem]  font-semibold text-neutral-900 text-opacity-50 leading-none max-md:max-w-full">
          Test case
        </div> */}
        <div>
          {exercise?.ExerciseTestcase?.map((testCase, index) => (
            <div class="flex-row flex gap-6 mt-2 justify-center">
              <div className="md:text-[1.25rem] text-[1rem]  font-semibold text-neutral-900 text-opacity-50 leading-none self-center max-md:max-w-full whitespace-nowrap">
                <p class="justify-center flex whitespace-nowrap">
                  Test case {index + 1}
                </p>
              </div>
              <input
                required
                type="text"
                placeholder="Nhập input"
                value={testCase.Input}
                onChange={(e) => handleTestCaseChange(e, index, "Input")}
                className="w-full px-3  border border-gray-300 rounded-lg focus:outline-none justify-center focus:ring-2 h-[63px] focus:ring-blue-500"
              />
              <input
                required
                type="text"
                placeholder="Nhập output"
                value={testCase.Output}
                onChange={(e) => handleTestCaseChange(e, index, "Output")}
                className="w-full px-3  border border-gray-300 rounded-lg focus:outline-none justify-center focus:ring-2 h-[63px] focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            onClick={addTestCase}
            class="mt-3 flex gap-2.5 justify-center items-center md:p-3 max-md:p-2 text-white rounded-lg bg-[#6C8299] hover:bg-slate-500"
          >
            Thêm Test Case
          </button>
        </div>
      </div>
    </>
  );
}

export default ContentSection;
