'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function FallbackImage({ src, alt, ...props }) {
  const [useFallback, setUseFallback] = useState(false);

  return useFallback ? (
    <img
      src={src}
      alt={alt}
      {...props}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      onError={() => {
        console.warn(`Image failed to load: ${src}, falling back to <img>`);
        setUseFallback(true);
      }}
      unoptimized
      {...props}
    />
  );
}
