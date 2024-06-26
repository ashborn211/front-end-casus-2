"use client";

import { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../FireBaseConfig";

interface WithAuthProps {}

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P & WithAuthProps) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push("/");
        } else {
          setLoading(false);
        }
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator while checking auth state
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
