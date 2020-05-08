import React, { useEffect, useState } from 'react';

// @ts-ignore
import debounce from 'lodash.debounce';

import { Tooltip } from './Tooltip';

type GiphySelection = {
  text: string;
  position: DOMRect;
  image: GiphyImage;
};

type GiphyImage = {
  src: string;
  alt: string;
  width: string;
  height: string;
};

const API_KEY = '4Z15yuylYr1bEQkpJiBb3dd4ffvUfs5v';
const API_URL = '//api.giphy.com/v1/gifs/translate';

async function fetchFromGiphy(query: string): Promise<GiphyImage | null> {
  const encodedQuery = encodeURIComponent(query);
  try {
    const response = await fetch(
      `${API_URL}?api_key=${API_KEY}&s=${encodedQuery}`
    );
    const json = await response.json();
    if (!json.data) {
      return null;
    }

    const image = json.data.images.fixed_height;
    return {
      src: image.url,
      alt: json.data.title,
      width: image.width,
      height: image.height,
    };
  } catch (error) {
    console.error('Giphy response failed', error);
    return null;
  }
}

export function GiphyTooltip() {
  const [giphySelection, setGiphySelection] = useState<GiphySelection | null>(
    null
  );

  const handleSelection = async () => {
    const selection = document.getSelection() as Selection;
    const text = selection.toString().trim();
    setGiphySelection(null);

    if (text && selection.rangeCount > 0) {
      const position = selection.getRangeAt(0).getBoundingClientRect();
      const giphyImage = await fetchFromGiphy(text);
      if (!giphyImage) {
        return;
      }
      setGiphySelection({
        text: text,
        position,
        image: giphyImage,
      });
    }
  };

  useEffect(() => {
    const debouncedHandleSelection = debounce(handleSelection, 200);
    document.addEventListener('selectionchange', debouncedHandleSelection);

    return function cleanup() {
      document.removeEventListener('selectionchange', debouncedHandleSelection);
    };
  }, []);

  return giphySelection ? (
    <Tooltip position={giphySelection.position}>
      <img {...giphySelection.image} />
    </Tooltip>
  ) : null;
}
