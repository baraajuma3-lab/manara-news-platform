import { useState, useRef } from 'react'
import {
  Search, Bell, Bold, Italic, List, Link2, Quote, Tag, X,
  BookOpen, ShieldCheck, BarChart3, UserPlus, Scale, AlertTriangle,
  FolderOpen, Eye,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'

function NewsComposer() {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState(['project: alpha-trace', 'internal only'])
  const [newTag, setNewTag] = useState('')
  const [showTagInput, setShowTagInput] = useState(false)
  const editorRef = useRef(null)
  const [wordCount, setWordCount] = useState(0)

  // تنفيذ أوامر التنسيق على النص المحدد (Bold / Italic / List ...)
  const format = (command) => {
    document.execCommand(command, false, null)
    editorRef.current?.focus()
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) document.execCommand('createLink', false, url)
    editorRef.current?.focus()
  }

  // حساب عدد الكلمات من نص المحرّر
  const handleEditorInput = () => {
    const text = editorRef.current?.innerText.trim() || ''
    setWordCount(text ? text.split(/\s+/).length : 0)
  }

  const addTag = () => {
    const t = newTag.trim()
    if (t && !tags.includes(t)) setTags([...tags, t])
    setNewTag('')
    setShowTagInput(false)
  }

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag))

  // ===== بيانات وهمية مؤقتة (تتبدل ببيانات الباك) =====
  const citations = [
    { source: 'SEC FILING 2024-A', match: '98% MATCH', desc: 'Direct evidence of capital diversion matching your "40% revenue" claim.' },
    { source: 'REUTERS INTEL', match: '85% MATCH', desc: "Confirms John D. Vane's resignation date of March 12th." },
  ]

  const facts = [
    { type: 'unverified', title: 'Unverified Claim', desc: '"Eastern Europe shell companies" – No direct links found in current dataset. Recommend further tracing.' },
    { type: 'confirmed', title: 'Confirmed Data', desc: 'Cayman Islands registration for Nero-Tech assets is confirmed via Global Financial Database.' },
  ]

  const readiness = [
    { label: 'Transparency Score', icon: BarChart3, value: 'A- (92%)', bg: 'bg-blue-100', color: 'text-blue-600' },
    { label: 'Peer Review', icon: UserPlus, value: 'PENDING (2/3)', bg: 'bg-pink-100', color: 'text-pink-600', badge: true },
    { label: 'Legal Check', icon: Scale, value: null, warn: true, bg: 'bg-red-100', color: 'text-red-600' },
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

        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">News Composer</h1>
        <p className="text-gray-500 mb-6">
          Create, analyze, and publish fact-based news reports with AI-assisted verification and source-backed evidence.
        </p>

        {/* Layout: editor + right widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Editor (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">

            {/* Toolbar */}
            <div className="bg-blue-600 rounded-xl px-4 py-3 flex items-center gap-4 text-white mb-6 flex-wrap">
              <button onClick={() => format('bold')} className="hover:bg-blue-500 p-1.5 rounded transition"><Bold size={18} /></button>
              <button onClick={() => format('italic')} className="hover:bg-blue-500 p-1.5 rounded transition"><Italic size={18} /></button>
              <button onClick={() => format('insertUnorderedList')} className="hover:bg-blue-500 p-1.5 rounded transition"><List size={18} /></button>
              <span className="w-px h-5 bg-blue-400" />
              <button onClick={insertLink} className="hover:bg-blue-500 p-1.5 rounded transition"><Link2 size={18} /></button>
              <button className="flex items-center gap-1 text-sm font-bold hover:bg-blue-500 px-2 py-1 rounded transition"><Quote size={16} /> CITE</button>
              <button onClick={() => setShowTagInput(true)} className="flex items-center gap-1 text-sm font-bold hover:bg-blue-500 px-2 py-1 rounded transition"><Tag size={16} /> TAG</button>
              <span className="ml-auto text-sm font-semibold tracking-wide">{wordCount.toLocaleString()} WORDS</span>
            </div>

            {/* Title */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Investigation Headline..."
              className="w-full text-4xl font-bold text-gray-900 placeholder-gray-300 outline-none mb-4"
            />

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap mb-6">
              {tags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg">
                  {i === 0 ? <FolderOpen size={13} /> : <Eye size={13} />}
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-blue-200"><X size={12} /></button>
                </span>
              ))}
              {showTagInput ? (
                <input
                  autoFocus
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  onBlur={addTag}
                  placeholder="new tag..."
                  className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 outline-none focus:border-blue-500"
                />
              ) : (
                <button onClick={() => setShowTagInput(true)} className="text-xs text-gray-400 border border-dashed border-gray-300 rounded-lg px-3 py-1.5 hover:border-blue-400 hover:text-blue-500 transition">
                  + Tag
                </button>
              )}
            </div>

            {/* Editable body */}
            <div
              ref={editorRef}
              contentEditable
onInput={handleEditorInput}
onKeyUp={handleEditorInput}              suppressContentEditableWarning
              data-placeholder="Start writing your investigation..."
              className="min-h-[400px] outline-none text-gray-700 leading-relaxed text-[15px] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300"
            />
          </div>

          {/* Right widgets */}
          <div className="flex flex-col gap-5">

            {/* Neutrality Checker */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-gray-900">Neutrality Checker</span>
                <span className="text-sm font-bold text-green-600">82% OPTIMAL</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your writing is currently scoring high for neutrality. Avoid the adjective "outrageous" to reach 90%.
              </p>
            </div>

            {/* Source Citation Assistant */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                <BookOpen size={18} className="text-blue-600" /> Source Citation Assistant
              </div>
              <div className="flex flex-col gap-3">
                {citations.map((c, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-gray-900">{c.source}</span>
                      <span className="text-[10px] font-semibold text-gray-400">{c.match}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{c.desc}</p>
                    <button className="text-[11px] font-bold text-blue-600 tracking-wide hover:underline">INSERT CITATION</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Fact Validation */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                <ShieldCheck size={18} className="text-blue-600" /> Fact Validation
              </div>
              <div className="flex flex-col gap-4">
                {facts.map((f, i) => (
                  <div key={i} className="flex gap-2.5">
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${f.type === 'confirmed' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <p className="font-bold text-sm text-gray-900">{f.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Publishing Readiness */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <p className="font-bold text-gray-900 mb-4">Publishing Readiness</p>
              <div className="flex flex-col gap-4">
                {readiness.map((r) => {
                  const Icon = r.icon
                  return (
                    <div key={r.label} className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg ${r.bg} flex items-center justify-center shrink-0`}>
                        <Icon size={18} className={r.color} />
                      </div>
                      <span className="flex-1 font-medium text-sm text-gray-800">{r.label}</span>
                      {r.warn ? (
                        <AlertTriangle size={18} className="text-red-500" />
                      ) : r.badge ? (
                        <span className="text-[10px] font-bold text-gray-600 border border-gray-200 rounded px-2 py-1">{r.value}</span>
                      ) : (
                        <span className="font-bold text-sm text-gray-900">{r.value}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}

export default NewsComposer