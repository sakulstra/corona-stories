import React from "react";
import { useRouter } from "next/router";

export default function WriteAStory() {
  const {
    query: { slug }
  } = useRouter();
  return <div>Story {slug}</div>;
}
