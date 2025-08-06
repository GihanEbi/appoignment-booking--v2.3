"use client";

import React, { Suspense } from "react";
import ViewChatComponent from "./ViewChatComponent";

const page = () => {
  return (
    <Suspense>
      <ViewChatComponent />
    </Suspense>
  );
};

export default page;
