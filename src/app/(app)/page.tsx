'use client';

import Features from "@/components/LandingPageFeatures/Features";
import Hero from "@/components/LandingPageHero/Hero";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    // temporarily redirect to signin page
    router.push("/signin");
  }, []);
  return (
    <>
      {/* <Hero />
      <Features /> */}
    </>
  );
};

export default page;
