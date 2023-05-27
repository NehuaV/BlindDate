import Link from "next/link";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { IoBookmarkOutline } from "react-icons/io5";
import { BiUserCircle } from "react-icons/bi";

interface PostProps {
  id: string;
  key: unknown;
  title: string;
  username: string;
  created_at: Date;
  status: string;
  picture: string;
}

export default function PostPreview(props: PostProps) {
  const postDate = new Date(props.created_at);
  let displayDate;
  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - postDate.getTime();

  //calculate number of minutes that have passed
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));

  // calculate number of hours that have passed
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

  // calculate number of days that have passed
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // calculate number of months that have passed
  const monthsDiff =
    (currentDate.getFullYear() - postDate.getFullYear()) * 12 +
    (currentDate.getMonth() - postDate.getMonth());

  // calculate number of years that have passed
  const yearsDiff = currentDate.getFullYear() - postDate.getFullYear();

  if (minutesDiff < 60) {
    displayDate = minutesDiff + " minutes ago";
  } else if (hoursDiff < 24) {
    displayDate = hoursDiff + " hours ago";
  } else if (daysDiff < 30) {
    displayDate = daysDiff + " days ago";
  } else if (monthsDiff < 12) {
    displayDate = monthsDiff + " months ago";
  } else {
    displayDate = yearsDiff + " years ago";
  }

  return (
    <Link href={`/home/${props.id}`}>
      <article className="mx-3 mb-3 rounded-xl border border-solid border-gray-200 bg-white px-5 transition ease-in-out hover:border-gray-100 hover:shadow-lg">
        <h1 className="mt-2 flex items-center text-xs">
          Posted by:
          <BiUserCircle
            style={{
              fontSize: "1rem",
              marginLeft: "0.5rem",
            }}
          />
          <p className="ml-1 mr-3 text-sm font-bold">{props.username}</p>
          <span className="text-gray-500">{displayDate}</span>
          <span className="ml-auto flex flex-row text-lg">
            <p className="mt-1 flex items-center text-xs">Status:</p>
            <p
              className={`px-2 ${
                props.status === "ACTIVE"
                  ? "text-green-600"
                  : props.status === "URGENT"
                  ? "text-yellow-500"
                  : "text-red-600"
              } `}
            >
              {props.status}
            </p>
          </span>
        </h1>
        <div className="my-3 text-base">{props.title}</div>
        <section className="mb-3 flex w-full flex-row font-semibold">
          <button className="flex items-center" aria-label="Like Button">
            <AiOutlineLike
              style={{
                fontSize: "1.5rem",
              }}
            />
            <p className="mx-1">Like</p>
          </button>
          <button className="flex items-center" aria-label="Dislike Button">
            <AiOutlineDislike
              style={{
                fontSize: "1.5rem",
                marginLeft: "0.5rem",
              }}
            />
            <p className="mx-1">Dislike</p>
          </button>
          <button
            className="ml-auto flex items-center"
            aria-label="Save Button"
          >
            <IoBookmarkOutline
              style={{
                fontSize: "1.5rem",
              }}
            />
            <p className="mx-1">Save</p>
          </button>
        </section>
      </article>
    </Link>
  );
}
