// pages/index.tsx
import Link from "next/link";
const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="relative flex min-h-screen flex-col items-center justify-center">
        <div className={"text-black mt-12 grid grid-cols-3 gap-5"}>
          <Link href={"/login"}>login</Link>
          <Link href={"/register"}>geen account</Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
