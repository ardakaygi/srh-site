import Image from "next/image";

/**
 * Blog cover photo with the business logo watermarked on top at reduced
 * opacity, per user request. `aspectClassName` lets the listing (wide
 * card) and detail page (taller hero) use different crops of the same
 * source image.
 */
export function BlogCoverImage({
  src,
  alt,
  aspectClassName = "aspect-[16/9]",
}: {
  src: string;
  alt: string;
  aspectClassName?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${aspectClassName}`}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/logo.svg"
          alt=""
          aria-hidden="true"
          width={200}
          height={200}
          className="h-2/5 w-2/5 opacity-25 drop-shadow-md"
        />
      </div>
    </div>
  );
}
