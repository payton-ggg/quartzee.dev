import { useTelegramFeed } from "../../hooks/useTelegramFeed";

const TelegramFeed = () => {
  const { posts, loading, error } = useTelegramFeed("PhilosophDiferent");

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

      {!loading && !error && posts.length === 0 && (
        <div className="text-gray-500 my-12 text-sm uppercase tracking-widest">No signals detected.</div>
      )}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
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
                  className="w-full h-auto object-cover max-h-[350px] transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}

            {post.videoUrl && (
              <div className="relative w-full rounded-md overflow-hidden bg-black/50 border border-white/5 z-10">
                <video 
                  src={post.videoUrl} 
                  controls 
                  className="w-full h-auto max-h-[350px]"
                />
              </div>
            )}

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
         <div className="mt-12">
            <a 
              href="https://t.me/PhilosophDiferent" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block px-8 py-3 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-black transition-all duration-300 text-sm uppercase tracking-widest font-bold shadow-[0_0_10px_rgba(34,197,94,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:-translate-y-1"
            >
              Open Full Channel
            </a>
         </div>
      )}
    </section>
  );
};

export default TelegramFeed;
