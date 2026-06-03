import { useState, useRef } from 'react'
import {
  Search, Bell, Plus, Send, Image, Clapperboard, Network, Keyboard, X,
  LayoutGrid, List, Link2, Share2, AlertTriangle, Users,
  CheckCircle2, ShieldAlert, HelpCircle, Camera, FileVideo2, GitBranch,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'

function VerifyNews() {
  const [query, setQuery] = useState('')
  const [files, setFiles] = useState([])
  const [activeTool, setActiveTool] = useState(null)
  const [verdict, setVerdict] = useState(null)
  const [results, setResults] = useState(null)
  const [resultMode, setResultMode] = useState('multi') // 'single' أو 'multi'
  const fileInputRef = useRef(null)

  const tools = [
    { label: 'Image Analysis', icon: Image, accept: 'image/*' },
    { label: 'Video Analysis', icon: Clapperboard, accept: 'video/*' },
    { label: 'Source Trace', icon: Network, accept: null },
    { label: 'Search by Keywords', icon: Keyboard, accept: null },
  ]

  const verdictStyles = {
    verified:  { label: 'Verified',   icon: CheckCircle2, color: '#16A34A', bg: 'bg-green-50',  text: 'text-green-700',  ring: 'border-green-200' },
    misleading:{ label: 'Misleading', icon: ShieldAlert,  color: '#DC2626', bg: 'bg-red-50',    text: 'text-red-700',    ring: 'border-red-200' },
    unverified:{ label: 'Unverified', icon: HelpCircle,   color: '#CA8A04', bg: 'bg-yellow-50', text: 'text-yellow-700', ring: 'border-yellow-200' },
  }

  // ===== بيانات وهمية مؤقتة (تتبدل ببيانات الباك) =====

  // نتيجة وحدة لتحليل الصورة
  const imageResult = [{
    meta: 'IMAGE ANALYSIS • UPLOADED FILE',
    title: 'Manipulated Image Detected',
    desc: 'Error Level Analysis reveals inconsistent compression around the central object. Metadata suggests the file was edited in Photoshop 2 days ago.',
    confidence: 28,
    footer: [{ icon: Camera, text: 'EXIF: Edited' }, { icon: AlertTriangle, text: 'Tampering: High' }],
  }]

  // نتيجة وحدة لتحليل الفيديو
  const videoResult = [{
    meta: 'VIDEO ANALYSIS • UPLOADED FILE',
    title: 'Possible Deepfake Indicators',
    desc: 'Frame-by-frame analysis detected unnatural facial boundary artifacts and audio-lip desync in 4 segments. Source likely synthetic.',
    confidence: 41,
    footer: [{ icon: FileVideo2, text: '4 flagged segments' }, { icon: AlertTriangle, text: 'Synthetic: Likely' }],
  }]

  // نتيجة وحدة لتتبع المصدر
  const sourceResult = [{
    meta: 'SOURCE TRACE • ORIGIN FOUND',
    title: 'Original Source Identified',
    desc: 'This narrative first appeared on a verified news outlet 6 hours ago. It was later reshared 1,200 times with altered captions across social platforms.',
    confidence: 88,
    footer: [{ icon: GitBranch, text: 'Origin: Reuters' }, { icon: Share2, text: '1.2k reshares' }],
  }]

  // عدة نتائج للبحث بالكلمات / الخبر المكتوب
  const keywordResults = [
    {
      meta: 'PUBLISHED 2H AGO • BLOOMBERG INTEL',
      title: 'Market Response to Proposed Environmental Framework Stabilizes',
      desc: 'Initial volatility across energy stocks has subsided as analysts dissect the specific...',
      confidence: 92,
      footer: [{ icon: Link2, text: '12 Citations' }, { icon: Share2, text: 'Viral potential: Low' }],
    },
    {
      meta: 'PUBLISHED 4H AGO • UNKNOWN SOURCE (SOCIAL)',
      title: 'Massive Vehicle Confiscation Plan Leaked from Council Meeting',
      desc: 'A viral thread circulating on encrypted platforms claims a secret addendum to the...',
      confidence: 12,
      footer: [{ icon: AlertTriangle, text: 'Misinformation High Risk' }, { icon: Users, text: '2.4k Bot Mentions' }],
    },
    {
      meta: 'PUBLISHED 7H AGO • REUTERS',
      title: 'Officials Confirm Routine Policy Review, Deny Leak Claims',
      desc: 'A government spokesperson described the circulating documents as fabricated and unrelated to any active policy...',
      confidence: 81,
      footer: [{ icon: Link2, text: '8 Citations' }, { icon: Share2, text: 'Viral potential: Medium' }],
    },
    {
      meta: 'PUBLISHED 1D AGO • AP NEWS',
      title: 'Fact Check: No Evidence Supports Viral Confiscation Rumor',
      desc: 'Independent fact-checkers traced the claim to a single anonymous post with no corroborating documentation...',
      confidence: 76,
      footer: [{ icon: Link2, text: '15 Citations' }, { icon: Share2, text: 'Viral potential: Low' }],
    },
  ]

  const handleToolClick = (tool) => {
    setActiveTool(tool.label)
    if (tool.accept && fileInputRef.current) {
      fileInputRef.current.setAttribute('accept', tool.accept)
      fileInputRef.current.click()
    }
  }

  const clearTool = () => {
    setActiveTool(null)
    setFiles([])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files)
    if (selected.length === 0) return
    const expected = activeTool === 'Image Analysis' ? 'image/'
      : activeTool === 'Video Analysis' ? 'video/' : null
    const valid = expected ? selected.filter((f) => f.type.startsWith(expected)) : selected
    const mapped = valid.map((f) => ({
      file: f,
      preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : null,
    }))
    setFiles((prev) => [...prev, ...mapped])
    e.target.value = ''
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!query.trim() && files.length === 0) return

    const payload = { text: query, files: files.map((f) => f.file), tool: activeTool }
    console.log('Verify payload:', payload)

    // TODO: استدعاء الباك إند هنا. الباك يرجّع الحكم + النتائج المناسبة للأداة.
    // مؤقتاً نختار البيانات الوهمية حسب الأداة:
    if (activeTool === 'Image Analysis') {
      setResultMode('single'); setResults(imageResult)
      setVerdict({ type: 'misleading', confidence: 28, summary: 'This image shows clear signs of digital manipulation. Edited regions were detected around the main subject.' })
    } else if (activeTool === 'Video Analysis') {
      setResultMode('single'); setResults(videoResult)
      setVerdict({ type: 'unverified', confidence: 41, summary: 'Synthetic media indicators detected. Manual review recommended before drawing conclusions.' })
    } else if (activeTool === 'Source Trace') {
      setResultMode('single'); setResults(sourceResult)
      setVerdict({ type: 'verified', confidence: 88, summary: 'The original source was successfully traced to a trusted outlet. Later versions were altered in reshares.' })
    } else {
      // Search by Keywords أو خبر مكتوب → عدة نتائج
      setResultMode('multi'); setResults(keywordResults)
      setVerdict({ type: 'unverified', confidence: 54, summary: 'Mixed signals across sources. Some trusted outlets confirm, while social posts show high misinformation risk.' })
    }
  }

  const visibleTools = activeTool ? tools.filter((t) => t.label === activeTool) : tools

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

        {/* Hero / search card */}
        <div className="bg-white rounded-3xl shadow-sm w-full px-10 py-10 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Find the Truth Behind the Headlines</h1>
          <p className="text-gray-500 mb-6">
            Use keywords or article titles to explore trusted sources and fact-check information.
          </p>

          <input type="file" ref={fileInputRef} multiple className="hidden" onChange={handleFileChange} />

          {files.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {files.map((f, i) => (
                <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
                  {f.preview ? (
                    <img src={f.preview} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                      <Clapperboard size={22} className="text-blue-600" />
                    </div>
                  )}
                  <button onClick={() => removeFile(i)} className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center text-red-500 shadow">
                    <X size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 bg-[#f4f6fb] rounded-2xl px-5 py-3 mb-6">
            <button
              onClick={() => {
                if (fileInputRef.current) {
                  const accept = activeTool === 'Image Analysis' ? 'image/*'
                    : activeTool === 'Video Analysis' ? 'video/*' : 'image/*,video/*'
                  fileInputRef.current.setAttribute('accept', accept)
                  fileInputRef.current.click()
                }
              }}
              className="text-gray-400 hover:text-blue-600 transition shrink-0"
            >
              <Plus size={22} />
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Write here..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
            <button onClick={handleSubmit} className="w-10 h-10 bg-blue-600 hover:bg-blue-700 transition rounded-full flex items-center justify-center text-white shrink-0">
              <Send size={18} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {visibleTools.map((tool) => {
              const Icon = tool.icon
              const isActive = activeTool === tool.label
              return (
                <div key={tool.label} className="relative">
                  <button
                    onClick={() => handleToolClick(tool)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-[#f4f6fb] text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500'} />
                    {tool.label}
                  </button>
                  {isActive && (
                    <button onClick={clearTool} className="absolute -top-1 -right-1 w-4 h-4 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                      <X size={11} />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Verdict card */}
        {verdict && (() => {
          const v = verdictStyles[verdict.type]
          const VIcon = v.icon
          return (
            <div className={`${v.bg} border ${v.ring} rounded-2xl p-6 mb-8 flex items-start gap-4`}>
              <VIcon size={40} style={{ color: v.color }} className="shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`text-xl font-bold ${v.text}`}>{v.label}</span>
                  <span className="text-sm font-semibold text-gray-500">{verdict.confidence}% confidence</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{verdict.summary}</p>
              </div>
            </div>
          )
        })()}

        {/* Results */}
        {results && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-gray-900">
                {resultMode === 'single' ? 'Analysis Result' : 'Search Results (42 hits)'}
              </h2>
              {resultMode === 'multi' && (
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"><LayoutGrid size={18} /></button>
                  <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"><List size={18} /></button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5">
              {results.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 flex gap-5 relative">
                  <div className="w-40 h-32 rounded-xl bg-gray-900 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold text-gray-400 tracking-wide mb-2">{r.meta}</p>
                    <h3 className="text-xl font-bold text-gray-900 leading-snug mb-2">{r.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">{r.desc}</p>
                    <div className="flex items-center gap-6 text-gray-500 text-sm">
                      {r.footer.map((f, j) => {
                        const FIcon = f.icon
                        return (
                          <span key={j} className="flex items-center gap-1.5">
                            <FIcon size={15} /> {f.text}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  <div className="absolute top-5 right-5 border border-gray-200 rounded-lg px-3 py-1.5 text-center">
                    <p className="font-bold text-sm text-gray-900">{r.confidence}%</p>
                    <p className="text-[9px] text-gray-400 tracking-wide">CONFIDENCE</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

export default VerifyNews