import { useState, useRef } from "react";
import { useTelegramFeed } from "../../hooks/useTelegramFeed";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const CustomVideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className="relative w-full rounded-md overflow-hidden bg-black/50 border border-white/5 z-10 group cursor-pointer"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto max-h-[450px] object-contain"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        playsInline
      />

      {/* Play/Pause Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100 group-hover:opacity-100"}`}
      >
        <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-500 backdrop-blur-sm transition-transform group-hover:scale-110 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
          {isPlaying ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" className="ml-1" />
          )}
        </div>
      </div>

      {/* Mute Button */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={toggleMute}
          className="p-2 rounded-full bg-black/60 border border-white/10 text-white hover:text-green-500 backdrop-blur-sm transition-colors"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
};

const TelegramFeed = () => {
  const { posts, loading, error, isFallback } =
    useTelegramFeed("PhilosophDiferent");
  const [visibleCount, setVisibleCount] = useState(6);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-center min-h-[85vh] py-6 px-4 md:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-mono flex items-center">
          <span className="text-gray-600 mr-2">## </span>
          transmissions
          <span className="text-green-500 text-xs sm:text-sm font-normal ml-3">
            // telegram stream
          </span>
        </h2>

        <a
          href="https://t.me/PhilosophDiferent"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-mono transition-all self-start sm:self-auto shadow-[0_0_10px_rgba(34,197,94,0.15)]"
        >
          <span>OPEN CHANNEL</span>
          <span>↗</span>
        </a>
      </div>

      {loading && (
        <div className="text-gray-500 animate-pulse flex items-center justify-center gap-3 my-12 font-mono text-sm">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
          <span>ESTABLISHING CONNECTION...</span>
        </div>
      )}

      {error && (
        <div className="text-red-400 border border-red-500/30 p-4 rounded-xl bg-red-500/10 my-4 text-center font-mono text-xs">
          [ERROR]: Failed to intercept signal ({error})
        </div>
      )}

      {isFallback && !loading && !error && (
        <div className="text-yellow-400/90 border border-yellow-500/20 p-2.5 rounded-xl bg-[#1a1708] mb-3 text-center text-xs font-mono flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-[11px] sm:text-xs">
              [OFFLINE CACHE]: BACKUP RENDERED
            </span>
          </div>
          <a
            href="https://t.me/PhilosophDiferent"
            target="_blank"
            rel="noreferrer"
            className="text-yellow-400 hover:underline font-bold text-[11px] sm:text-xs"
          >
            Direct Link ↗
          </a>
        </div>
      )}

      {/* Posts Container */}
      <div
        data-scrollable="true"
        className="overflow-y-auto max-h-[62vh] pr-1 sm:pr-2 custom-scrollbar focus:outline-none"
        tabIndex={0}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visiblePosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#111317]/95 border border-white/10 rounded-xl p-4 flex flex-col gap-3 transition-all duration-300 hover:border-green-500/40 hover:shadow-[0_0_15px_rgba(34,197,94,0.12)] group relative overflow-hidden"
            >
              <div className="text-[11px] font-mono text-gray-500 flex justify-between items-center border-b border-white/5 pb-2.5 relative z-10">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 group-hover:bg-green-500 transition-colors" />
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <a
                  href="https://t.me/PhilosophDiferent"
                  target="_blank"
                  rel="noreferrer"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400 hover:underline"
                >
                  view ↗
                </a>
              </div>

              {post.photoUrl && (
                <div className="relative w-full rounded-lg overflow-hidden bg-black border border-white/5 z-10 max-h-[220px]">
                  <img
                    src={post.photoUrl}
                    alt="Telegram post media"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}

              {post.videoUrl && <CustomVideoPlayer src={post.videoUrl} />}

              {post.text && (
                <div
                  className="text-xs sm:text-sm font-mono text-gray-300 leading-relaxed break-words relative z-10
                  [&>a]:text-green-400 [&>a]:underline-offset-4 hover:[&>a]:underline
                  [&>i]:text-gray-400 [&>b]:text-white
                  [&>tg-emoji]:inline-block [&>tg-emoji]:w-4 [&>tg-emoji]:h-4"
                  dangerouslySetInnerHTML={{ __html: post.text }}
                />
              )}
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-4 flex justify-center pb-2">
            <button
              onClick={loadMore}
              className="px-5 py-2 border border-white/10 hover:border-green-500/40 text-gray-300 hover:text-white rounded-lg bg-[#111317] transition-all text-xs font-mono font-bold"
            >
              LOAD MORE TRANSMISSIONS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TelegramFeed;
