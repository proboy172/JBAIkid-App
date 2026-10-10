import React from "react";

interface RenderAvatarOptions {
  alt?: string;
  sizeClass?: string;
  textClass?: string;
}

export function renderAvatar(
  avatarOrEmoji?: string,
  {
    alt = "Avatar",
    sizeClass = "w-5 h-5",
    textClass = "text-base",
  }: RenderAvatarOptions = {}
): React.ReactNode {
  if (!avatarOrEmoji) {
    return <span className={textClass}>📺</span>;
  }

  const isUrl =
    avatarOrEmoji.startsWith("http://") ||
    avatarOrEmoji.startsWith("https://") ||
    avatarOrEmoji.startsWith("/");

  if (isUrl) {
    return (
      <img
        src={avatarOrEmoji}
        alt={alt}
        className={`${sizeClass} rounded-full object-cover shrink-0 inline-block border border-white/20`}
        onError={(e) => {
          (e.currentTarget as HTMLElement).style.display = "none";
        }}
      />
    );
  }

  return <span className={textClass}>{avatarOrEmoji}</span>;
}
