import { Send } from "lucide-react"

const Letterbox = () => {
  return (
    <div className="bg-[#212121] border border-gray-700 rounded-lg p-8 mt-14">
      <h3 className="text-2xl font-mono text-white mb-6">
        <span className="text-gray-500">### </span>
        anonymous letterbox
      </h3>
      <p className="font-mono text-gray-400 text-base mb-6">
        here you can type a message that will be anonymous (i won't get to know who you are) 
        and will be delivered to me in a matter of seconds!
      </p>
      <p className="font-mono text-gray-400 text-xs mb-6">
        some of them might even get posted on the shoutbox↓ below! some of the posted ones 
        might even get an answer from me!!
      </p>
      <form className="flex flex-col space-y-4 mt-6">
        <textarea
          rows={4}
          className="w-full bg-black border border-gray-600 rounded px-4 py-3 font-mono text-base text-white focus:outline-none focus:border-terminal-green transition-colors resize-none mb-2"
          placeholder="type your message here..."
        />
        <button
          type="submit"
          className="w-full bg-terminal-green text-black font-mono text-base py-3 rounded hover:bg-green-400 transition-colors flex items-center justify-center space-x-2"
        >
          <Send size={18} />
          <span>send message</span>
        </button>
      </form>
    </div>
  )
}

export default Letterbox