const Shoutbox = () => {
  return (
    <div className="bg-[#212121] border border-gray-700 rounded-lg p-8 mt-14">
      <h3 className="text-2xl font-mono text-white mb-6">
        <span className="text-gray-500">### </span>
        shoutbox
      </h3>
      <p className="font-mono text-gray-400 text-base mb-6">
        here you can see the messages that have been posted to the shoutbox.
      </p>
      <p className="font-mono text-gray-400 text-xs mb-6">
        some of the posted ones might even get an answer from me!!
      </p>
    </div>
  )
}

export default Shoutbox