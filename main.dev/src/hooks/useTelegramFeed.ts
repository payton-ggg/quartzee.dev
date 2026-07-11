import { useState, useEffect } from "react";

export interface TelegramPost {
  id: string;
  text: string;
  photoUrl?: string;
  videoUrl?: string;
  date: string;
}

export function useTelegramFeed(channelName: string) {
  const [posts, setPosts] = useState<TelegramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFeed = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://t.me/s/${channelName}`;
        // Using allorigins to bypass CORS
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error("Failed to fetch feed");
        
        const data = await response.json();
        
        if (!isMounted) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, "text/html");

        const messageNodes = doc.querySelectorAll(".tgme_widget_message_wrap");
        const parsedPosts: TelegramPost[] = [];

        messageNodes.forEach((node, index) => {
          // Skip if it is a service message (like channel created)
          if (node.querySelector(".tgme_widget_message_service")) return;

          const textNode = node.querySelector(".tgme_widget_message_text");
          const photoNode = node.querySelector(".tgme_widget_message_photo_wrap");
          const videoNode = node.querySelector(".tgme_widget_message_video");
          const dateNode = node.querySelector(".tgme_widget_message_date time");

          let text = "";
          if (textNode) {
            text = textNode.innerHTML;
          }

          let photoUrl = undefined;
          if (photoNode) {
            const style = photoNode.getAttribute("style");
            if (style) {
              const match = style.match(/background-image:url\('([^']+)'\)/);
              if (match) {
                photoUrl = match[1];
              }
            }
          }

          let videoUrl = undefined;
          if (videoNode) {
            const src = videoNode.getAttribute("src");
            if (src) videoUrl = src;
          }

          let date = new Date().toISOString();
          if (dateNode) {
            date = dateNode.getAttribute("datetime") || date;
          }

          // Only add if there is some content
          if (text || photoUrl || videoUrl) {
            parsedPosts.push({
              id: `post-${index}`,
              text,
              photoUrl,
              videoUrl,
              date,
            });
          }
        });

        // Telegram renders oldest top to newest bottom on the public web view page?
        // Actually, it usually shows chronological order. Let's reverse to show newest first.
        setPosts(parsedPosts.reverse());

      } catch (err: any) {
        if (isMounted) setError(err.message || "An error occurred");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFeed();

    return () => {
      isMounted = false;
    };
  }, [channelName]);

  return { posts, loading, error };
}
