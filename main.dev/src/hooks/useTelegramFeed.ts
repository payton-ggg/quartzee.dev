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

      const targetUrl = `https://t.me/s/${channelName}`;
      let htmlContent = "";
      let lastError: any = null;

      // List of CORS proxies to try in order
      const PROXIES = [
        {
          name: "allorigins_json",
          getUrl: (url: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(url + "?_=" + Date.now())}`,
          parse: async (res: Response) => {
            const data = await res.json();
            if (!data || typeof data.contents !== "string") {
              throw new Error("Invalid allorigins format");
            }
            return data.contents;
          }
        },
        {
          name: "corsproxy.io",
          getUrl: (url: string) => `https://corsproxy.io/?url=${encodeURIComponent(url + "?_=" + Date.now())}`,
          parse: async (res: Response) => res.text()
        },
        {
          name: "cors.lol",
          getUrl: (url: string) => `https://api.cors.lol/?url=${encodeURIComponent(url + "?_=" + Date.now())}`,
          parse: async (res: Response) => res.text()
        },
        {
          name: "codetabs",
          getUrl: (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url + "?_=" + Date.now())}`,
          parse: async (res: Response) => res.text()
        }
      ];

      for (const proxy of PROXIES) {
        if (!isMounted) return;
        try {
          console.log(`[TelegramFeed] Trying proxy: ${proxy.name}`);
          const proxyUrl = proxy.getUrl(targetUrl);
          
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);
          
          const response = await fetch(proxyUrl, {
            signal: controller.signal,
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          
          const content = await proxy.parse(response);
          if (!content) {
            throw new Error("Empty response");
          }
          
          // Verify it's a valid Telegram page
          if (!content.includes("tgme_widget_message") && !content.includes("tgme_channel_info")) {
            throw new Error("Not a valid Telegram page content");
          }
          
          htmlContent = content;
          console.log(`[TelegramFeed] Success with proxy: ${proxy.name}`);
          break; // Exit the loop on success!
        } catch (err: any) {
          console.warn(`[TelegramFeed] Proxy ${proxy.name} failed:`, err.message || err);
          lastError = err;
        }
      }

      if (!htmlContent) {
        console.warn("[TelegramFeed] All live proxies failed. Loading offline backup archive.");
        if (isMounted) {
          setPosts(MOCK_POSTS);
          setIsFallback(true);
          setLoading(false);
        }
        return;
      }

      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");

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

        if (!isMounted) return;

        if (parsedPosts.length === 0) {
          // If no posts are parsed, fall back to mock posts
          console.warn("[TelegramFeed] No posts parsed from live HTML. Loading backup archive.");
          setPosts(MOCK_POSTS);
          setIsFallback(true);
        } else {
          setPosts(parsedPosts.reverse());
          setIsFallback(false);
        }
      } catch (err: any) {
        console.error("[TelegramFeed] Error parsing feed:", err);
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
