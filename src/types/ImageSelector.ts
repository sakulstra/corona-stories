export type MetSearchResponse = {
    total: number
    objectIDs: number[]
}

export type MetSingleResponse = {
    title: string
    artistDisplayName: string
    primaryImage: string
    primaryImageSmall: string
    objectURL: string
}

export type DeepResponse = {
    id: string
    output_url: string
}

export type UnsplashSingleItem = {
    description: string
    user: {
        name: string
    }
    urls: {
        raw: string
        full: string
        regular: string
        small: string
        thumb: string
        toBeUsed?: string
    }
    links: {
        html: string
    }
}

export type UploadMetadata = {
    photoAuthor?: string
    photoUrl?: string
    styleAuthor?: string
    styleUrl?: string
    url?: string
}

export type RandomPhotoResponse = {
    photo?: UnsplashSingleItem
    style?: MetSingleResponse
    upload?: UploadMetadata
}
