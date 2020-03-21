import React from "react";
import Link from "next/link";
import { Story, StoryDummy } from "@ty";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";

const DummyStories: Story[] = [StoryDummy];

function StoryList({ stories }: { stories: Story[] }) {
  return (
    <List>
      {stories.map(story => (
        <Link
          passHref
          href="/story/[slug]"
          as={`/story/${story.slug}`}
          key={story.slug}
        >
          <ListItem component="a">
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={story.title}
              secondary={story.createdAt.toLocaleDateString()}
            />
          </ListItem>
        </Link>
      ))}
    </List>
  );
}

export default function BrowseStories() {
  // TODO: fetch stories
  const stories = DummyStories;
  return (
    <div>
      <StoryList stories={stories} />
    </div>
  );
}
