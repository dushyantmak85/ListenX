import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, LogOut, Music, Sun, Moon } from 'lucide-react';

export default function MusicApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('dark');
  const [mood, setMood] = useState('');
  const [suggestedGenres, setSuggestedGenres] = useState<string[]>([]);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleMoodSubmit = () => {
    const moodMap: { [key: string]: string[] } = {
      happy: ['pop', 'dance'],
      sad: ['acoustic', 'piano'],
      angry: ['metal', 'rock'],
      calm: ['lofi', 'ambient'],
    };
    const suggestions = moodMap[mood.toLowerCase()] || ['pop'];
    setSuggestedGenres(suggestions);
  };

  return (
    <div className="flex h-screen flex-col md:flex-row bg-gradient-to-br from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] text-white dark:from-white dark:via-gray-100 dark:to-gray-200 dark:text-black">
      <aside className="w-full md:w-64 bg-[#130f40] dark:bg-gray-200 p-6 flex flex-col justify-between shadow-xl">
        <div>
          <h1 className="text-3xl font-bold mb-10 tracking-wide text-[#fdbb2d] dark:text-[#130f40]">ListenX</h1>
          <nav className="space-y-6 text-lg">
            <a href="#" className="flex items-center gap-2 hover:text-[#fdbb2d] transition-all">
              <Music size={20} /> Discover
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-[#fdbb2d] transition-all">
              <Music size={20} /> Playlists
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-[#fdbb2d] transition-all">
              <Music size={20} /> Moods
            </a>
          </nav>
        </div>
        <div className="flex items-center justify-between">
          <button onClick={toggleTheme} className="text-yellow-300 dark:text-gray-800">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="flex items-center gap-2 text-red-400 hover:text-red-500 transition-all">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full max-w-xl mb-8">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for songs, artists, or albums..."
              className="w-full p-4 pl-12 rounded-2xl bg-[#3c40c6] dark:bg-gray-300 text-white dark:text-black placeholder-gray-200 dark:placeholder-gray-500 focus:outline-none shadow-md"
            />
            <Search className="absolute top-4 left-4 text-gray-200 dark:text-gray-600" size={20} />
          </div>

          <div className="mb-10 max-w-xl">
            <h2 className="text-lg font-semibold mb-2">🎧 Mood-based Suggestions</h2>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="Type your mood (e.g., happy, sad)"
                className="flex-1 p-3 rounded-xl bg-[#3c40c6] dark:bg-gray-300 text-white dark:text-black placeholder-gray-200 focus:outline-none shadow-md"
              />
              <button
                onClick={handleMoodSubmit}
                className="px-4 py-2 rounded-xl bg-[#fdbb2d] hover:bg-[#fca311] text-black font-semibold shadow-md"
              >
                Suggest
              </button>
            </div>
            {suggestedGenres.length > 0 && (
              <p className="text-sm text-gray-200 dark:text-gray-700">
                Suggested genres: {suggestedGenres.join(', ')}
              </p>
            )}
          </div>
        </motion.div>

        <section>
          <h2 className="text-xl font-semibold mb-6">🔥 Top Picks for You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-[#3c40c6] dark:bg-gray-100 rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform cursor-pointer"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="h-40 bg-gradient-to-tr from-[#fdbb2d] to-[#ff5e62] dark:bg-gray-300 rounded-xl mb-4"></div>
                <h3 className="text-sm font-semibold dark:text-black">Album Title {i + 1}</h3>
                <p className="text-xs text-gray-200 dark:text-gray-600">Artist Name</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}