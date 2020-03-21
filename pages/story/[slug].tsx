import React from "react";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import StoryForm from "@components/StoryForm";
import { Story, StoryDummy } from "@ty";

export default function WriteAStory() {
  const {
    query: { slug }
  } = useRouter();
  // TODO: fetch the correct story
  const story: Story = StoryDummy;
  return (
    <div>
      <Typography variant="h6">{story.title}</Typography>
      {story.parts.map((part, ix) => (
        <Typography key={ix}>{part}</Typography>
      ))}
      <StoryForm />
    </div>
  );
}
