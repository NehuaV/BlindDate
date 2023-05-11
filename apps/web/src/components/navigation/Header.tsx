import Link from "next/link";
import { FiPlusSquare } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-10 flex justify-between bg-white p-2 shadow-md">
        <Link href={"/home"}>Blind Date</Link>
        <div className="flex items-center gap-4">
          <Link href={"/post"}>
            <FiPlusSquare
              style={{
                height: "1.5rem",
                width: "1.5rem",
                display: "inline-block",
              }}
            />
          </Link>
          <Link href={"/profile"}>
            <CgProfile
              style={{
                height: "1.5rem",
                width: "1.5rem",
              }}
            />
          </Link>
          <Link href={"/"}>LOGOUT HERE</Link>
        </div>
      </header>
    </>
  );
}
