import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Login() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Image
        src={"/background.png"}
        quality={50}
        fill
        sizes="100vw"
        unoptimized
        style={{ zIndex: -40, objectFit: "cover" }}
        alt={"Background image"}
      />
      <Image
        src={"/blind_date_logo(1).png"}
        alt={"Logo"}
        width={400}
        height={250}
        unoptimized
        style={{ marginBottom: "1rem" }}
      />

      {user ? (
        <Link
          className="rounded-lg bg-white p-4 text-center"
          href={"/api/auth/logout"}
        >
          Logout
        </Link>
      ) : (
        <Link
          className="rounded-lg bg-white p-4 text-center"
          href={"/api/auth/login?returnTo=/home"}
        >
          Login
        </Link>
      )}
    </>
  );
}
