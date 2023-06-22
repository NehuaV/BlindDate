import Link from "next/link";
import { FiPlusSquare } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white p-2 px-8 shadow-md">
        <Link href={"/home"} className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          Blind Date
        </Link>
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
          <Link
            className="rounded-lg bg-white p-2 text-center"
            href={"/api/auth/logout"}
          >
            Logout
          </Link>
        </div>
      </header>
    </>
  );
}
