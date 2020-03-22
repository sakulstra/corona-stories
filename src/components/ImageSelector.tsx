import React, { useEffect, useState } from 'react'
import deepai from 'deepai'
import Unsplash from 'unsplash-js'
import {
    UploadMetadata,
    RandomPhotoResponse,
    MetSearchResponse,
    MetSingleResponse,
    DeepResponse,
    UnsplashSingleItem,
} from 'src/types'
import Image from '@components/Image'
import IconButton from '@material-ui/core/IconButton'
import Reload from '@material-ui/icons/Cached'

const unsplashKeys: string[] = [
    '955c92676fbff5987db2c89ebad2118cbd67b7dfbf424263454ab60d029dcef1',
    'Uf1FfcsEwCdCDfup-ka6-c1J4PkBcMYj6afPiNCPwTE',
]

const randomFromArray = (array: any[]) => {
    return array[Math.floor(Math.random() * (array.length + 1))]
}

const unsplash = new Unsplash({
    accessKey: randomFromArray(unsplashKeys),
})

deepai.setApiKey('b1f6a192-c7fc-4ca2-917d-80e92cb1cc4f')

const getMetObectIdsForKeyword = (): Promise<MetSearchResponse> => {
    let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=*&hasImages=true&medium=Paintings`
    return fetch(url).then((res) => res.json())
}
const getSingleMetImageForId = (id: number): Promise<MetSingleResponse> =>
    fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    ).then((res) => res.json())

const transferStyle = async (args: RandomPhotoResponse) => {
    const response: DeepResponse = await deepai.callStandardApi(
        'neural-style',
        {
            content: `${args.photo.urls.toBeUsed}`,
            style: args.style.primaryImageSmall,
        }
    )
    return {
        photoAuthor: args.photo.user.name,
        photoUrl: args.photo.links.html,
        styleAuthor: args.style.artistDisplayName,
        styleUrl: args.style.objectURL,
        url: response.output_url,
    }
}

const getRandomMetImage = async () => {
    let { objectIDs } = await getMetObectIdsForKeyword()
    return getSingleMetImageForId(randomFromArray(objectIDs)).then((res) => res)
}

const getRandomImage = async (): Promise<UploadMetadata> => {
    const result: RandomPhotoResponse = {}
    const metImage = getRandomMetImage().then(
        (metImage) => (result.style = metImage)
    )
    const unsplashImage = unsplash.photos
        .getRandomPhoto({ count: 1 })
        .then(async (res) => ((await res.json()) as UnsplashSingleItem[])[0])
        .then((unsplashImage) => (result.photo = unsplashImage))
    await Promise.all([metImage, unsplashImage])
    if (result.photo?.urls) {
        result.photo.urls.toBeUsed = `${result.photo.urls.raw}&fit=crop&w=512&h=512&q=80`
        return transferStyle(result)
    }
    return
}

export default function ImageSelector({
    image,
    onChange,
}: {
    image: UploadMetadata
    onChange: Function
}) {
    const [loading, setLoading] = useState(false)
    const getImages = () => {
        setTimeout(async () => {
            setLoading(true)
            const image = await getRandomImage()
            setLoading(false)
            onChange(image)
        }, 0)
        return onChange(image)
    }
    useEffect(() => {
        return getImages()
    }, [])
    return (
        <>
            <Image image={image} />
            <IconButton
                disabled={loading}
                aria-label="reload image"
                onClick={getImages}
            >
                <Reload />
            </IconButton>
        </>
    )
}
