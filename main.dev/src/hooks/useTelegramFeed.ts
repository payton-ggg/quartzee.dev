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
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const MOCK_POSTS: TelegramPost[] = [
      {
        id: "mock-1",
        text: `In a world of constant connection, selective isolation is the ultimate power move. Protect your bandwidth, refine your inputs, and guard your consciousness. <br/><br/><i>"The price of anything is the amount of life you exchange for it."</i>`,
        date: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
      },
      {
        id: "mock-2",
        text: `We consume information like sugar, yet starve for wisdom. The modern oracle isn't Google; it is the quiet space between your thoughts. <br/><br/><b>Unplug to find the signal.</b>`,
        date: new Date(Date.now() - 3600000 * 24 * 1.5).toISOString(), // 1.5 days ago
      },
      {
        id: "mock-3",
        text: `The illusion of choice in the digital sphere: we choose which feed to scroll, but we don't choose what the algorithm feeds us. True autonomy starts when you step off the grid. #cybernetics #philosophy`,
        date: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
      },
      {
        id: "mock-4",
        text: `Is logic the operating system of the mind, or just a program we run to convince ourselves of order in a chaotic universe? Sometimes the most rational action is to accept the absurd. #absurdism`,
        date: new Date(Date.now() - 3600000 * 24 * 5).toISOString(), // 5 days ago
      },
      {
        id: "mock-5",
        text: `Excellence is never an accident. It is always the result of high intention, sincere effort, and intelligent execution; it represents the wise choice of many alternatives - choice, not chance, determines your destiny.`,
        date: new Date(Date.now() - 3600000 * 24 * 8).toISOString(), // 8 days ago
      },
      {
        id: "mock-6",
        text: `The signal remains stable. As we navigate the complex currents of the web, remember to calibrate your compass. The truth is rarely loud; listen to the whispers.`,
        date: new Date(Date.now() - 3600000 * 24 * 12).toISOString(), // 12 days ago
      }
    ];

    const fetchFeed = async () => {
      setLoading(true);
      setError(null);
      setIsFallback(false);

      const RSSHUB_INSTANCES = [
        "https://rsshub.rssforever.com",
        "https://rsshub.moeyy.cn",
        "https://rsshub.pseudoyu.com",
        "https://rsshub.app"
      ];

      let data: any = null;

      for (const instance of RSSHUB_INSTANCES) {
        if (!isMounted) return;
        try {
          console.log(`[TelegramFeed] Trying RSSHub instance: ${instance}`);
          const url = `${instance}/telegram/channel/${channelName}?format=json`;
          
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);
          
          const response = await fetch(url, {
            signal: controller.signal,
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          
          data = await response.json();
          if (!data || !data.items) {
            throw new Error("Invalid RSSHub format");
          }
          
          console.log(`[TelegramFeed] Success with RSSHub instance: ${instance}`);
          break; // Exit the loop on success
        } catch (err: any) {
          console.warn(`[TelegramFeed] RSSHub instance ${instance} failed:`, err.message || err);
        }
      }

      if (!data || !data.items) {
        console.warn("[TelegramFeed] All RSSHub instances failed. Loading offline backup archive.");
        if (isMounted) {
          setPosts(MOCK_POSTS);
          setIsFallback(true);
          setLoading(false);
        }
        return;
      }

      try {
        const parsedPosts: TelegramPost[] = [];

        data.items.forEach((item: any, index: number) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(item.content_html || "", "text/html");

          let text = "";
          let photoUrl = undefined;
          let videoUrl = undefined;

          // RSSHub telegram usually puts images as <img> tags
          const imgNode = doc.querySelector("img");
          if (imgNode) {
            photoUrl = imgNode.getAttribute("src") || undefined;
            imgNode.remove();
          }

          // And videos as <video> tags
          const videoNode = doc.querySelector("video");
          if (videoNode) {
            videoUrl = videoNode.getAttribute("src") || undefined;
            videoNode.remove();
          }

          text = doc.body.innerHTML.trim();

          // Ignore empty or service messages
          if (text === "Channel photo removed" || text === "Channel created") text = "";

          if (text || photoUrl || videoUrl) {
            parsedPosts.push({
              id: item.id || item.url || `post-${index}`,
              text,
              photoUrl,
              videoUrl,
              date: item.date_published || new Date().toISOString(),
            });
          }
        });

        if (!isMounted) return;

        if (parsedPosts.length === 0) {
          console.warn("[TelegramFeed] No posts parsed from RSSHub. Loading backup archive.");
          setPosts(MOCK_POSTS);
          setIsFallback(true);
        } else {
          // RSSHub returns newest first
          setPosts(parsedPosts);
          setIsFallback(false);
        }
      } catch (err: any) {
        console.error("[TelegramFeed] Error parsing RSSHub feed:", err);
        if (isMounted) {
          setPosts(MOCK_POSTS);
          setIsFallback(true);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFeed();

    return () => {
      isMounted = false;
    };
  }, [channelName]);

  return { posts, loading, error, isFallback };
}
