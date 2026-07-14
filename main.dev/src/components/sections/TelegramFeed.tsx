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
  const { posts, loading, error, isFallback } = useTelegramFeed("PhilosophDiferent");
  const [visibleCount, setVisibleCount] = useState(6);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="w-full mt-20 mb-8 flex flex-col items-center">
      <h2 className="text-xl md:text-2xl font-bold mb-8 text-green-500 uppercase tracking-widest text-center flex flex-col items-center gap-2">
        <span>Latest Transmissions</span>
        <div className="w-12 h-1 bg-green-500 rounded"></div>
      </h2>

      {loading && (
        <div className="text-gray-500 animate-pulse flex items-center gap-3 my-12">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
          <span>ESTABLISHING CONNECTION...</span>
        </div>
      )}

      {error && (
        <div className="text-red-500 border border-red-500/30 p-4 rounded bg-red-500/10 my-12 w-full max-w-md text-center text-sm">
          [ERROR]: Failed to intercept signal ({error})
        </div>
      )}

      {isFallback && !loading && !error && (
        <div className="text-yellow-500/80 border border-yellow-500/20 p-4 rounded bg-yellow-500/5 mb-8 w-full max-w-2xl text-center text-xs tracking-wider uppercase font-mono flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            <span>[SECURE SIGNAL CACHE]: LIVE SIGNAL SCRAMBLED / OFFLINE BACKUP RENDERED</span>
          </div>
          <a
            href="https://t.me/PhilosophDiferent"
            target="_blank"
            rel="noreferrer"
            className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4 font-bold"
          >
            Direct Link
          </a>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="text-gray-500 my-12 text-sm uppercase tracking-widest">
          No signals detected.
        </div>
      )}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {visiblePosts.map((post) => (
          <div
            key={post.id}
            className="bg-black/40 border border-white/10 rounded-lg p-5 flex flex-col gap-4 backdrop-blur-sm transition-all duration-300 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)] group relative overflow-hidden"
          >
            {/* Subtle background glow effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="text-xs text-gray-500 flex justify-between items-center border-b border-white/5 pb-3 relative z-10">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 group-hover:bg-green-500 transition-colors"></span>
                {new Date(post.date).toLocaleString()}
              </span>
              <a
                href={`https://t.me/PhilosophDiferent`}
                target="_blank"
                rel="noreferrer"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400 hover:text-green-300 hover:underline"
              >
                View on Telegram
              </a>
            </div>

            {post.photoUrl && (
              <div className="relative w-full rounded-md overflow-hidden bg-black/50 border border-white/5 z-10">
                <img
                  src={post.photoUrl}
                  alt="Telegram post media"
                  className="w-full h-auto object-cover max-h-[450px] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}

            {post.videoUrl && <CustomVideoPlayer src={post.videoUrl} />}

            {post.text && (
              <div
                className="text-sm text-gray-300 leading-relaxed break-words relative z-10
                [&>a]:text-green-400 [&>a]:underline-offset-4 hover:[&>a]:underline
                [&>i]:text-gray-400 [&>b]:text-white
                [&>tg-emoji]:inline-block [&>tg-emoji]:w-5 [&>tg-emoji]:h-5"
                dangerouslySetInnerHTML={{ __html: post.text }}
              />
            )}
          </div>
        ))}
      </div>

      {!loading && posts.length > 0 && (
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          {hasMore && (
            <button
              onClick={loadMore}
              className="px-8 py-3 border border-white/20 text-white rounded-md hover:bg-white/10 transition-all duration-300 text-sm uppercase tracking-widest font-bold"
            >
              Load More
            </button>
          )}
          <a
            href="https://t.me/PhilosophDiferent"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-8 py-3 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-black transition-all duration-300 text-sm uppercase tracking-widest font-bold shadow-[0_0_10px_rgba(34,197,94,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:-translate-y-1 text-center"
          >
            Open Full Channel
          </a>
        </div>
      )}
    </section>
  );
};

export default TelegramFeed;
