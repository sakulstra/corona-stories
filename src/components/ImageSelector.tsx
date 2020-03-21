import React, { useState, useEffect } from "react";
import deepai from "deepai";
import Unsplash from "unsplash-js";

const unsplash = new Unsplash({
  accessKey: "955c92676fbff5987db2c89ebad2118cbd67b7dfbf424263454ab60d029dcef1"
});

deepai.setApiKey("b1f6a192-c7fc-4ca2-917d-80e92cb1cc4f");

type MetSearchResponse = {
  total: number;
  objectIDs: number[];
};

type MetSingleResponse = {
  primaryImage: string;
  primaryImageSmall: string;
};

type RandomPhotoResponse = {
  photoUrl?: string;
  styleUrl?: string;
  resultUrl?: string;
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

const getFastStyleTransfer = (args: RandomPhotoResponse) =>
  deepai.callStandardApi("fast-style-transfer", {
    content: args.photoUrl,
    style: args.styleUrl
  });

const getRandomImage = async (
  keyword: string
): Promise<RandomPhotoResponse> => {
  const result: RandomPhotoResponse = {};
  const { objectIDs, total } = await getMetObectIdsForKeyword(keyword);

  result.styleUrl = await getSingleMetImageForId(
    objectIDs[randomIntMax(objectIDs.length)]
  ).then(res => res.primaryImage);

  result.photoUrl = await unsplash.photos
    .getRandomPhoto({ count: 1 })
    .then(async res => (await res.json())[0].urls.full);

  result.resultUrl = await getFastStyleTransfer({ ...result }).then(
    res => res.output_url
  );
  return result;
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
      const image = (await getRandomImage(keyword)).resultUrl;
      onChange(image);
    }, 500);
    return () => clearTimeout(handler);
  };
  useEffect(() => {
    return getImages();
  }, [keyword]);
  return null;
}
