import React from "react";
import Link from "next/link";
import { Story } from "@ty";

const stories: Story[] = [
  {
    title: "bla",
    slug: "bla",
    parts: ["A long time ago"],
    createdAt: new Date()
  }
];

export default function BrowseStories() {
  return (
    <div>
      {stories.map(story => (
        <div key={story.slug}>
          <Link passHref href="/story/[slug]" as={`/story/${story.slug}`}>
            <a>{story.title}</a>
          </Link>
        </div>
      ))}
    </div>
  );
}
