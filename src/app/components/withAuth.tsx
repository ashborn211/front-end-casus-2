import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../FireBaseConfig";
import React from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      if (!auth.currentUser) {
        router.push("/");
      }
    }, [router]);

    if (!auth.currentUser) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
