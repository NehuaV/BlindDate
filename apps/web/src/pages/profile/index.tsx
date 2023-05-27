import ProfileLayout from "@/layouts/ProfileLayout";

import { FaRegEdit } from "react-icons/fa";

import Image from "next/image";

export default function ProfilePage() {
  return (
    <article className="mt-7 flex flex-row">
      <main className="w-1/3 flex-col">
        <div className=" rounded- justify-center border bg-gray-300 p-6">
          <div className=" mb-6 h-64">
            <Image
              src="https://myprofilepage.com.au/public/assets/images/new/home/monstar.gif"
              alt="User profile image"
              height={500}
              width={500}
              className="h-full w-full object-contain"
            />
          </div>
          <p className="text-center text-lg font-bold">John Doe</p>
        </div>
        <button className=" mt-4 flex w-full items-center justify-center rounded bg-gray-200 px-4 py-2 font-bold text-black hover:bg-slate-400">
          <FaRegEdit className="mr-2" style={{ color: "black" }} />
          Edit Profile
        </button>
      </main>
      <div className="w-2/3 pl-4">
        <main>
          <div>
            <p className="pb-2 text-xl">YOUR POSTS</p>
            <hr className=" border border-black" />
          </div>
        </main>
      </div>
    </article>
  );
}

ProfilePage.GetLayout = function getLayout(page: React.ReactNode) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
