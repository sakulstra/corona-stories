import { UploadMetadata as RandomImageUploadMetadata } from './ImageSelector'

export type Story = {
    title: string
    slug: string
    image: RandomImageUploadMetadata
    parts: { text: string; userId: string }[]
    createdAt: any
}

export const StoryDummy: Story = {
    title: 'A short story about everything',
    slug: 'a-short-story-about-everything',
    parts: [{ text: 'bla', userId: 'someId' }],
    image: {
        url:
            'https://api.deepai.org/job-view-file/cec969fc-4866-406c-bcaf-0d5dacb4f6ae/outputs/output.png',
    },
    createdAt: new Date(),
}
