import PostLayout from "@/layouts/PostLayout";
import React, { useState } from "react";
import post from "src/utils/post";
import Image from "next/image";
import { env } from "@/env.mjs";
export default function PostPage() {
  const [files, setFile] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");
  const [anonymous, setAnonymous] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [picture_desc, setImageDescription] = useState<string>("");
  const [postedAnonymously, setPostedAnonymously] = useState(false);
  const handleToggleAnonymity = (value: boolean) => {
    setAnonymous(value);
    setPostedAnonymously(true);
  };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const URL = env.NEXT_PUBLIC_GATEWAY + "/post";
    if (URL) {
      await post(URL, {
        title,
        content,
        picture_desc,
        anonymous,
        status: "ACTIVE",
      }).then(async (result) => {});
    } else {
      console.error("URL is not defined.");
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    const file = e.target.files;

    for (let i = 0; i < file!.length; i++) {
      const fileType = file![i].type;
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

      if (validImageTypes.includes(fileType)) {
        setFile([...files, file![i]]);
      } else {
        setMessage("only images accepted");
      }
    }
  };
  const removeImage = (name: string) => {
    setFile(files.filter((x) => x.name !== name));
  };

  return (
    <article>
      <main>
        <p className="py-7 text-center text-2xl ">CREATE POST</p>
        <hr className=" border border-black" />
        <form className="pt-3" method="post" onSubmit={handleSubmit}>
          <section>
            <input
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              name="title"
              className="h-10 w-full bg-gray-200 placeholder:px-2 placeholder:text-xl placeholder:text-slate-600"
            />
          </section>
          <section className="pt-5">
            <textarea
              rows={3}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className="h-40 w-full resize-none bg-gray-200 placeholder:px-2 placeholder:text-xl placeholder:text-slate-600"
              placeholder="Description"
            />
          </section>
          <section className="flex  ">
            <section className="basis-3/4 ">
              <p className="mb-1 flex items-center justify-center bg-white text-[12px] text-red-500">
                {message}
              </p>
              <section className="relative h-32 w-full cursor-pointer items-center overflow-hidden ">
                <input
                  type="file"
                  onChange={handleFile}
                  className="absolute z-10 h-full w-full opacity-0"
                  name="files[]"
                />
                <section className="z-1 absolute top-0 flex h-full w-full items-center justify-center bg-slate-50 ">
                  <div className="flex flex-col">
                    <p className="text-xl">
                      Drag images here or click to select files
                    </p>
                    <p className="text-sm">
                      Attach as many files as you like, each file should npt
                      exceed 5mb
                    </p>
                  </div>
                </section>
              </section>
              <section className="mt-2 flex flex-wrap ">
                {files.map((file, key) => {
                  return (
                    <div
                      key={key}
                      className="flex h-16 w-full items-center justify-between rounded bg-white p-3"
                    >
                      <div className="flex flex-row items-center gap-2">
                        <div className="h-12 w-12 ">
                          <Image
                            alt="Your image with name: {file.name}"
                            className="h-full w-full "
                            src={URL.createObjectURL(file)}
                            width={500}
                            height={500}
                          />
                        </div>
                        <span className="w-44 truncate">{file.name}</span>
                      </div>
                      <div
                        onClick={() => {
                          removeImage(file.name);
                        }}
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm bg-red-400"
                      >
                        <i className="mdi mdi-trash-can text-[14px] text-white"></i>
                      </div>
                    </div>
                  );
                })}
              </section>
            </section>
          </section>

          <div className="pt-5">
            <input
              placeholder="Image description"
              onChange={(e) => {
                setImageDescription(e.target.value);
              }}
              type="text"
              name="imageDescription"
              className="h-10 w-full bg-gray-200 placeholder:px-2 placeholder:text-xl placeholder:text-slate-600"
            />
          </div>
          <div>
            <div className="mt-3">
              <div className="flex">
                <p className="ml-2 mr-4 text-sm font-medium">
                  Post anonymously
                </p>
                <button
                  type="button"
                  className={`${
                    anonymous ? "bg-[#3B81F6]" : "bg-gray-200"
                  } mr-5 h-6 w-11 rounded-full`}
                  onClick={() => handleToggleAnonymity(true)}
                >
                  YES
                </button>
                <button
                  type="button"
                  className={`${
                    !anonymous && postedAnonymously
                      ? "bg-[#3B81F6]"
                      : "bg-gray-200"
                  } h-6 w-11 rounded-full`}
                  onClick={() => handleToggleAnonymity(false)}
                >
                  NO
                </button>
              </div>
            </div>
            <hr className="my-6 border border-black " />
            <button
              type="submit"
              className={`mb-6 h-14 w-full rounded-3xl ${
                postedAnonymously
                  ? "bg-[#3B81F6] text-white"
                  : "cursor-not-allowed bg-gray-300 text-gray-500"
              } text-2xl font-normal`}
              disabled={!anonymous && !postedAnonymously}
            >
              ADD POST
            </button>
          </div>
        </form>
      </main>
    </article>
  );
}

PostPage.GetLayout = function GetLayout(page: React.ReactNode) {
  return <PostLayout>{page}</PostLayout>;
};
