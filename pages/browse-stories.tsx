import React from "react";
import { Story } from "@ty";

const stories: Story[] = [
  { title: "bla", parts: ["A long time ago"], createdAt: new Date() }
];

export default function BrowseStories() {
  return <div>browse existing stories</div>;
}
