import { doc, getDoc } from "firebase/firestore";
import { db } from "./FireBaseConfig";

const docRef = doc(db, "users", "l6RAmYhVc0GZAMEYz9SY");
const docSnap = await getDoc(docRef);
console.log("Document data:", docSnap.data());



export default function Home(): JSX.Element {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing
        </p>
        <div>

        </div>
      </div>
    </main>
  );
}
