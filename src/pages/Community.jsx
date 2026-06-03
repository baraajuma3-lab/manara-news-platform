import {
  Search, Bell, SlidersHorizontal, TrendingUp, Zap, Clock,
  ChevronUp, ChevronDown, MessageSquare, Share2, Flag, Award, BadgeCheck,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'

function Community() {

  const investigations = [
    { tag: 'VERIFICATION', id: '#88219-M', title: 'Climate Data Manipulation: Arctic Core', desc: 'Analyzing discrepancies between reported satellite thermal maps and...', confidence: 42 },
    { tag: 'VERIFICATION', id: '#88219-M', title: 'Climate Data Manipulation: Arctic Core', desc: 'Analyzing discrepancies between reported satellite thermal maps and...', confidence: 82 },
  ]

  const trends = [
    { title: '#GasPriceHoax2024', meta: '4.2k active discussions • Viral on X', badge: null },
    { title: 'AI-Generated Health Scams', meta: '1.8k active discussions • TikTok Origin', badge: { icon: Zap, label: 'High Velocity' } },
    { title: 'Fake Satellite Footage: Mars', meta: '500 active discussions • Reddit Leak', badge: { icon: Clock, label: 'Emerging' } },
  ]

  const contributors = [
    { name: 'Elena Sokolov', meta: '98.2% Accuracy • Level 50', rank: '#1', verified: true },
    { name: 'Marcus Chen', meta: '96.5% Accuracy • Level 48', rank: '#2', verified: false },
    { name: 'Sarah J. Miller', meta: '94.1% Accuracy • Level 44', rank: '#3', verified: false },
  ]

  return (
    <div className="flex min-h-screen bg-[#f4f6fb]" dir="ltr">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 px-8 py-6">

        {/* Topbar */}
        <div className="flex items-center justify-between gap-6 mb-8">
          <div className="relative flex-1 max-w-3xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Scan URL, keyword, or source..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
            <Bell size={22} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Content grid: left (main) + right (sidebar widgets) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT — spans 2 cols */}
          <div className="lg:col-span-2">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-1">Shared Investigations</h1>
                <p className="text-gray-500">Ongoing collaborative fact-checks across global sectors.</p>
              </div>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition mt-2">
                <SlidersHorizontal size={22} />
              </button>
            </div>

            {/* Investigation cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {investigations.map((inv, i) => (
                <div key={i} className="bg-blue-600 rounded-3xl p-6 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded tracking-wide">{inv.tag}</span>
                    <span className="text-xs text-blue-200">ID: {inv.id}</span>
                  </div>
                  <h3 className="text-2xl font-bold leading-snug mb-4">{inv.title}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed mb-6">{inv.desc}</p>

                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-blue-100">Confidence Index</span>
                    <span className="font-semibold">{inv.confidence}% Verified</span>
                  </div>
                  <div className="w-full h-1.5 bg-blue-900/40 rounded-full mb-6 overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${inv.confidence}%` }} />
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Avatars */}
                    <div className="flex items-center bg-white rounded-full p-1 pr-2">
                      <div className="w-7 h-7 rounded-full bg-blue-200 border-2 border-white" />
                      <div className="w-7 h-7 rounded-full bg-pink-200 border-2 border-white -ml-2" />
                      <span className="text-blue-600 text-xs font-bold ml-1">+5</span>
                    </div>
                    <button className="bg-blue-500/40 hover:bg-blue-500/60 transition text-white font-semibold text-sm px-6 py-2.5 rounded-xl">
                      Join Case
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Community Feed */}
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare className="text-gray-900" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">Community Feed</h2>
            </div>

            <div className="flex flex-col gap-5">

              {/* Post 1 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex gap-4">
                  {/* Votes */}
                  <div className="flex flex-col items-center text-gray-400 shrink-0">
                    <button className="hover:text-blue-600 transition"><ChevronUp size={20} /></button>
                    <span className="text-sm font-bold text-gray-700">156</span>
                    <button className="hover:text-blue-600 transition"><ChevronDown size={20} /></button>
                  </div>
                  {/* Body */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="bg-indigo-50 text-indigo-500 text-xs font-bold px-2 py-0.5 rounded">DEBATE</span>
                      <span className="text-gray-500">Posted by <span className="text-gray-700">@osint_specialist</span> • 4h ago</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Metadata mismatch in the latest leaked diplomat papers. Possible fabrication by AI?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      The EXIF data points to a location in the Pacific, yet the shadows suggest an Eastern European sun angle. Looking for forensic imaging experts to verify.
                    </p>
                    <div className="flex items-center gap-6 text-gray-500 text-sm mb-4">
                      <span className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition"><MessageSquare size={16} /> 48 Comments</span>
                      <span className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition"><Share2 size={16} /> Share</span>
                      <span className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition"><Flag size={16} /> Report</span>
                    </div>
                    {/* Nested comment */}
                    <div className="bg-indigo-50/60 border-l-2 border-indigo-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-6 h-6 rounded-full bg-blue-200" />
                        <span className="font-bold text-sm text-gray-800">@shadow_analyst</span>
                        <span className="text-xs text-gray-400">2h ago</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        I ran the luminance levels through the ELA engine. There is a distinct noise pattern shift around the text block. Definitely tampered.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 2 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center text-gray-400 shrink-0">
                    <button className="hover:text-blue-600 transition"><ChevronUp size={20} /></button>
                    <span className="text-sm font-bold text-gray-700">82</span>
                    <button className="hover:text-blue-600 transition"><ChevronDown size={20} /></button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="bg-blue-50 text-blue-500 text-xs font-bold px-2 py-0.5 rounded">EVIDENCE</span>
                      <span className="text-gray-500">Posted by <span className="text-gray-700">@fact_miner</span> • 8h ago</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-4">New evidence link for the Arctic Core investigation: Raw Buoy Data ID #442.</h3>
                    <div className="flex items-center gap-6 text-gray-500 text-sm">
                      <span className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition"><MessageSquare size={16} /> 12 Comments</span>
                      <span className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition"><Share2 size={16} /> Share</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT — sidebar widgets */}
          <div className="flex flex-col gap-6">

            {/* Trending Misinfo */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-blue-600 text-white px-5 py-3 flex items-center gap-2">
                <TrendingUp size={18} />
                <span className="font-bold">Trending Misinfo</span>
              </div>
              <div className="p-5 flex flex-col gap-5">
                {trends.map((t, i) => (
                  <div key={i} className={i < trends.length - 1 ? 'pb-5 border-b border-gray-100' : ''}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-gray-900 text-sm">{t.title}</p>
                      {t.badge && (
                        <span className="flex items-center gap-1 text-xs text-gray-500 shrink-0">
                          <t.badge.icon size={13} /> {t.badge.label}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{t.meta}</p>
                  </div>
                ))}
                <button className="bg-blue-600 hover:bg-blue-700 transition text-white font-bold text-xs tracking-wide py-3 rounded-xl">
                  VIEW ALL TRENDS
                </button>
              </div>
            </div>

            {/* Elite Contributors */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-blue-600 text-white px-5 py-3 flex items-center gap-2">
                <Award size={18} />
                <span className="font-bold">Elite Contributors</span>
              </div>
              <div className="p-5 flex flex-col gap-4">
                {contributors.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                      {c.verified && (
                        <BadgeCheck className="absolute -bottom-1 -right-1 text-blue-600 bg-white rounded-full" size={16} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.meta}</p>
                    </div>
                    <span className="text-blue-600 font-bold text-sm">{c.rank}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Start an Investigation */}
            <div className="bg-blue-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Start an Investigation</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Found a suspicious narrative? Create a private or public collaborative workspace.
              </p>
              <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition">
                Initiate Collaboration
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}

export default Community