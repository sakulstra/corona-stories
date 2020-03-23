import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Story, StoryDummy } from '@ty'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import firebase from '@utils/firebase'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'

function StoryList({ stories }: { stories: Story[] }) {
    return (
        <>
            <List>
                {stories.map((story) => (
                    <Link
                        passHref
                        href="/story/[slug]"
                        as={`/story/${story.slug}`}
                        key={story.slug}
                    >
                        <ListItem component="a" divider button>
                            <ListItemAvatar>
                                <Badge
                                    badgeContent={story.parts.length}
                                    color="primary"
                                >
                                    <Avatar
                                        src={story.image.url}
                                        variant="rounded"
                                    />
                                </Badge>
                            </ListItemAvatar>
                            <ListItemText
                                primary={story.title}
                                secondary={story.createdAt
                                    .toDate()
                                    .toDateString()}
                            />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Link passHref href="/write-a-story">
                <Button variant="outlined">
                    Nothing you like? Create new story
                </Button>
            </Link>
        </>
    )
}

export default function BrowseStories() {
    const [stories, setStories] = useState<any[]>([])
    const fetchData = () => {
        const db = firebase.firestore()
        return db.collection('stories').onSnapshot((querySnapshot) => {
            const stories = []
            querySnapshot.forEach(function (doc) {
                stories.push(doc.data())
            })
            setStories(stories)
        })
    }

    useEffect(() => {
        return fetchData()
    }, [])

    return (
        <div>
            <StoryList stories={stories} />
        </div>
    )
}
