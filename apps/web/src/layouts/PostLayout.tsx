import Header from "@/components/navigation/Header";
import Head from "next/head";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function PostLayout({ children, ...props }: BaseLayoutProps) {
  return (
    <>
      <Head>
        <title>Blind Date App</title>
      </Head>
      <div className="flex h-screen flex-col bg-slate-50">
        <Header />
        <div className="mx-0 flex md:mx-56">
          <main className="w-full">{children}</main>
        </div>
      </div>
    </>
  );
}
