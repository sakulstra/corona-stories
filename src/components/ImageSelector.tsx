import React, { useState, useEffect } from 'react'
import deepai from 'deepai'
import Unsplash from 'unsplash-js'
//import firebase from '../utils/firebase'
import {
    UploadMetadata,
    RandomPhotoResponse,
    MetSearchResponse,
    MetSingleResponse,
    DeepResponse,
    UnsplashSingleItem,
} from 'src/types'
import keywordExtractor from 'keyword-extractor'
import LanguageDetect from 'languagedetect'
import { StripChar } from 'stripchar'
import Image from '@components/Image'

const unsplash = new Unsplash({
    accessKey: 'Uf1FfcsEwCdCDfup-ka6-c1J4PkBcMYj6afPiNCPwTE',
})

deepai.setApiKey('b1f6a192-c7fc-4ca2-917d-80e92cb1cc4f')

const lngDetector = new LanguageDetect()

const getMetObectIdsForKeyword = (
    keyword?: string
): Promise<MetSearchResponse> => {
    let url
    if (keyword) {
        url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}&hasImages=true&medium=Paintings`
    } else {
        url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=*&hasImages=true&medium=Paintings&isHighlight=true`
    }
    return fetch(url).then((res) => res.json())
}
const getSingleMetImageForId = (id: number): Promise<MetSingleResponse> =>
    fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    ).then((res) => res.json())

const randomIntMax = (max: number) => {
    return Math.floor(Math.random() * (max + 1))
}

const getFastStyleTransfer = async (args: RandomPhotoResponse) => {
    const response: DeepResponse = await deepai.callStandardApi(
        'fast-style-transfer',
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

const getRandomMetImage = async (keyword: string) => {
    let { objectIDs } = await getMetObectIdsForKeyword(keyword)
    if (!objectIDs || !(objectIDs.length == 0)) {
        objectIDs = (await getMetObectIdsForKeyword()).objectIDs
    }
    return getSingleMetImageForId(
        objectIDs[randomIntMax(objectIDs.length)]
    ).then((res) => res)
}

const getRandomImage = async (keywords: string[]): Promise<UploadMetadata> => {
    console.log(keywords)
    const result: RandomPhotoResponse = {}
    const metImage = getRandomMetImage(JSON.stringify(keywords.join(','))).then(
        (metImage) => (result.style = metImage)
    )
    const unsplashImage = unsplash.photos
        .getRandomPhoto({ count: 1, query: JSON.stringify(keywords.join(',')) })
        .then(async (res) => ((await res.json()) as UnsplashSingleItem[])[0])
        .then((unsplashImage) => (result.photo = unsplashImage))
    const unsplashImageBackup = unsplash.photos
        .getRandomPhoto({ count: 1 })
        .then(async (res) => ((await res.json()) as UnsplashSingleItem[])[0])
    await Promise.all([metImage, unsplashImage, unsplashImageBackup])
    if (!result.photo) result.photo = await unsplashImageBackup
    result.photo.urls.toBeUsed = `${result.photo.urls.raw}&fit=crop&w=512&h=512&q=80`
    return getFastStyleTransfer(result)
}

export default function ImageSelector({
    image,
    onChange,
}: {
    image: UploadMetadata
    onChange: Function
}) {
    const sentence = 'bla'

    const getImages = () => {
        const availableKeywordlangs = [
            'danish',
            'dutch',
            'english',
            'french',
            'galician',
            'german',
            'italian',
            'polish',
            'portuguese',
            'romanian',
            'russian',
            'spanish',
            'swedish',
        ]
        const handler = setTimeout(async () => {
            const strippedKeywords = StripChar.RSExceptAlpha(sentence, '_')
                .toString()
                .replace('_', ' ')
            const language = lngDetector
                .detect(strippedKeywords)
                .filter((language) =>
                    availableKeywordlangs.includes(language[0])
                )[0][0]
            console.log(language)
            const keywords: string[] = keywordExtractor.extract(sentence, {
                language,
                remove_digits: true,
                return_changed_case: true,
                remove_duplicates: true,
            })
            const image = await getRandomImage(
                keywords.length > 0 ? keywords : sentence.split(' ')
            )
            onChange(image)
        }, 500)
        return () => clearTimeout(handler)
    }
    useEffect(() => {
        return getImages()
    }, [sentence])
    return <Image image={image} />
}
