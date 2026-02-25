"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectView() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en");
  }, [router]);

  return null;
}
