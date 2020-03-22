import React, { useState, useEffect } from "react";
import deepai from "deepai";
import Unsplash from "unsplash-js";
import firebase from "../utils/firebase";

const unsplash = new Unsplash({
  accessKey: "955c92676fbff5987db2c89ebad2118cbd67b7dfbf424263454ab60d029dcef1"
});

deepai.setApiKey("b1f6a192-c7fc-4ca2-917d-80e92cb1cc4f");

type MetSearchResponse = {
  total: number;
  objectIDs: number[];
};

type MetSingleResponse = {
  title: string;
  artistDisplayName: string;
  primaryImage: string;
  primaryImageSmall: string;
  objectURL: string;
};

type DeepResponse = {
  id: string;
  output_url: string;
};

type UnsplashSingleItem = {
  description: string;
  user: {
    name: string;
  };
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    toBeUsed?: string;
  };
  links: {
    html: string;
  };
};

type UploadMetadata = {
  photoAuthor: string;
  photoUrl: string;
  styleAuthor: string;
  styleUrl: string;
  url?: string;
};

type RandomPhotoResponse = {
  photo?: UnsplashSingleItem;
  style?: MetSingleResponse;
  upload?: UploadMetadata;
};

const getMetObectIdsForKeyword = (
  keyword: string
): Promise<MetSearchResponse> =>
  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}&hasImages=true&medium=Paintings`
  ).then(res => res.json());

const getSingleMetImageForId = (id: number): Promise<MetSingleResponse> =>
  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
  ).then(res => res.json());

const randomIntMax = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};

const getFastStyleTransfer = async (args: RandomPhotoResponse) => {
  const response: DeepResponse = await deepai.callStandardApi(
    "fast-style-transfer",
    {
      content: `${args.photo.urls.toBeUsed}`,
      style: args.style.primaryImageSmall
    }
  );
  return {
    photoAuthor: args.photo.user.name,
    photoUrl: args.photo.links.html,
    styleAuthor: args.style.artistDisplayName,
    styleUrl: args.style.objectURL,
    url: response.output_url
  };
};

const getRandomMetImage = async (keyword: string) => {
  const { objectIDs } = await getMetObectIdsForKeyword(keyword);
  return getSingleMetImageForId(objectIDs[randomIntMax(objectIDs.length)]).then(
    res => res
  );
};

/*const uploadImage = async (photoInformation: RandomPhotoResponse) => {
  const imageBlob = await fetch(photoInformation.deep.output_url).then(response => response.blob())
  const customMetadata: FirebaseUploadMetadata = {
    photoAuthor: photoInformation.photo.user.name,
    photoUrl: photoInformation.photo.links.html,
    styleAuthor: photoInformation.style.artistDisplayName,
    styleUrl: photoInformation.style.objectURL
  }
  const uploadTask = await firebase.storage().ref(`images/${photoInformation.deep.id}`).put(imageBlob, { customMetadata });
  return {
    url: await uploadTask.ref.getDownloadURL(),
    ...customMetadata
  }
}*/

const getRandomImage = async (keyword: string): Promise<UploadMetadata> => {
  const result: RandomPhotoResponse = {};
  const metImage = getRandomMetImage(keyword).then(
    metImage => (result.style = metImage)
  );
  const unsplashImage = unsplash.photos
    .getRandomPhoto({ count: 1 })
    .then(async res => ((await res.json()) as UnsplashSingleItem[])[0])
    .then(unsplashImage => (result.photo = unsplashImage));
  await Promise.all([metImage, unsplashImage]);
  result.photo.urls.toBeUsed = `${result.photo.urls.raw}&fit=crop&w=512&h=512&q=80`;
  return getFastStyleTransfer(result);
};

export default function ImageSelector({
  keyword,
  onChange
}: {
  keyword: string;
  onChange: Function;
}) {
  const getImages = () => {
    const handler = setTimeout(async () => {
      const image = await getRandomImage(keyword);
      console.log(image);
      onChange(image.url);
    }, 500);
    return () => clearTimeout(handler);
  };
  useEffect(() => {
    return getImages();
  }, [keyword]);
  return null;
}
