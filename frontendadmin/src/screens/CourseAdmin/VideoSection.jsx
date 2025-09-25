import * as React from "react";
import { useRef, useState } from "react";

export function VideoSection({ video, selectedFileName, setSelectedFileName }) {
  const uploadVideoInputRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      console.log("File type:", file.type);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setSelectedFileName(file);
    }
  };

  return (
    <div className="flex flex-col mt-11 w-full max-md:mt-10 max-md:max-w-full">
      <label className="md:text-[1.25rem] text-[1rem]  font-medium leading-none text-neutral-900 text-opacity-50 max-md:max-w-full">
        Video <span className="text-red-600">*</span>
      </label>
      <div className="flex flex-col mt-2 w-full bg-[#EBF1F9] max-md:max-w-full">
        <video
          controls
          width="100%"
          src={videoUrl ? videoUrl : video?.VideoUrl}
          className="rounded-xl"
        />
        {/* <img
          loading="lazy"
          src={videoUrl?videoUrl:video.}
          alt="Course video content"
          className="object-contain z-10 w-full aspect-[1.77] max-md:max-w-full"
        /> */}
      </div>
      <div className="flex flex-col mt-2 max-w-full md:text-[1.25rem] text-[1rem]  font-medium leading-none w-[569px]">
        <input
          type="file"
          className="gap-2.5 self-stretch my-auto form-control-file hidden" // Ẩn input file
          id="VideoFile"
          name="VideoFile"
          accept="video/mp4,video/webm"
          ref={uploadVideoInputRef}
          onChange={handleVideoChange}
        />
        <label
          className="flex gap-3 justify-center items-center self-start md:p-3 max-md:p-2 text-white rounded-lg bg-[#6C8299]"
          for="VideoFile"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e6d8440f1f20af9db42a97a51642268ab1311088ced96ec49dc9a2a9191ba40?placeholderIfAbsent=true&apiKey=66913a0089c7476296e0d5e235a1975e"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <span className="gap-2.5 self-stretch my-auto">Chọn tệp</span>
        </label>
        <div className="mt-2 text-slate-500">
          {selectedFileName
            ? selectedFileName.name
            : "Không có tệp nào được chọn"}
        </div>
      </div>
    </div>
  );
}
