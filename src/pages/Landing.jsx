import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/somecomponants/logo.png'
import loginIcon from '../assets/somecomponants/login.png'
import landBg from '../assets/background/landbcg.png'
import aboutBg from '../assets/background/aboutusbcg.png'

import dotBg from '../assets/background/dotbc.png'
import bc1 from '../assets/somecomponants/bc1.svg'
import bc2 from '../assets/somecomponants/bc2.svg'
import bc3 from '../assets/somecomponants/bc3.svg'
import bc4 from '../assets/somecomponants/bc4.svg'
import bc5 from '../assets/somecomponants/bc5.svg'
import bc6 from '../assets/somecomponants/bc6.svg'

function Landing() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('الرئيسية')

  return (
    <div className="min-h-screen">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-12 py-5 bg-white sticky top-0 z-50 shadow-sm">
        <img src={logo} alt="Manara" className="h-8" />

        <div className="flex items-center gap-10" dir="rtl">
          {[
            { label: 'الرئيسية', id: 'hero' },
            { label: 'نبذة عنا', id: 'about' },
            { label: 'المميزات', id: 'features' },
          ].map((item) => (
            <span
              key={item.label}
              onClick={() => {
                setActiveNav(item.label)
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`text-sm cursor-pointer ${activeNav === item.label ? 'font-bold text-black' : 'text-gray-500'}`}
            >
              {item.label}
            </span>
          ))}
        </div>

        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 rounded-xl text-sm border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
        >
          التسجيل
        </button>
      </nav>

      {/* Hero Section */}
      <div
        id="hero"
        className="relative flex flex-col items-center justify-center text-center px-8 py-20 min-h-[90vh]"
        style={{
          backgroundImage: `url(${landBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        dir="rtl"
      >
        <img src={loginIcon} alt="icon" className="w-16 h-16 rounded-2xl mb-6 shadow-lg" />

        <h1 className="text-7xl font-regular mb-10 text-gray-900">
          تحقق وتتبع و حقق!
        </h1>

        <h2 className="text-5xl font-light text-gray-400 mb-10">
          كل هذا في منصة واحدة
        </h2>

        <p className="text-gray-500 text-lg mb-10">
          تتبع المصادر، وتحقق من الأخبار، وحارب المعلومات المضللة.
        </p>

        <button
          onClick={() => navigate('/')}
          className="bg-[#2563EB] text-white px-10 py-4 rounded-2xl text-lg font-regular hover:bg-blue-700 transition"
        >
          العرض التقديمي
        </button>
      </div>

      {/* نبذة عنا */}
  
<div

  id="about"
  className="relative py-20 px-12 text-center min-h-[90vh] flex flex-col items-center justify-center mt-90"
  dir="rtl"
  style={{
    backgroundImage: `url(${aboutBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <p className="text-black text-2xl mb-7 ">نبذة عنا</p>
  <h2 className="text-5xl font-regular mb-9">ما هي منارة؟</h2>
  <p className="text-black-500 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
    منارة هي منصة صحافة استقصائية مدعومة بالذكاء الاصطناعي، تُساعد الصحفيين والباحثين على تتبع الأخبار
    إلى مصادرها الأصلية والتحقق من مصداقيتها، ومكافحة المعلومات المضللة.
    توفر المنصة ميزات بحث ذكية، وتتبعًا للأخبار، وتقييمًا للمصداقية، وبيئة تعاونية تجمع
    المختصين للعمل معًا لضمان دقة المعلومات.
  </p>
  <button
    onClick={() => navigate('/')}
    className="bg-[#2563EB] text-white px-10 py-4 rounded-2xl text-lg font-regular hover:bg-blue-700 transition"
  >
    انضم الان
  </button>
</div>



     {/* المميزات */}
<div
  id="features"
  className="py-20 px-16 mt-90"
  dir="rtl"
  style={{
    backgroundImage: `url(${dotBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <p className="text-gray-800 text-3xl mb-10 text-right">المميزات الرئيسية</p>
  <h2 className="text-5xl font-normal mb-9 text-right">مجموعة أدوات التحقيق</h2>
  <p className="text-gray-500 text-lg mb-12 text-right">
    نظام بيئي متعدد الطبقات مصمم لتحليل الحقائق بدقة<br />وتتبع السرد العالمي.
  </p>

<div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
  {[
    { bg: bc3, icon: '🔍', title: 'البحث الذكي عن المصادر', desc: 'ابحث عن المصدر الأصلي باستخدام الكلمات المفتاحية عبر المواقع الموثوقة.' },
    { bg: bc2, icon: '🕐', title: 'تتبع مصدر الأخبار', desc: 'تتبّع كيفية انتشار المعلومات واكتشف أين بدأت القصة.' },
    { bg: bc1, icon: '🌍', title: 'فلتر الأخبار الجغرافية', desc: 'خصّص موجز الأخبار حسب البلد، أو المنطقة، أو مجال البحث.' },
    { bg: bc6, icon: '🔔', title: 'تنبيهات الأخبار المكررة', desc: 'احصل على تنبيهات عند ظهور قصص مماثلة في مصادر متعددة.' },
    { bg: bc5, icon: '🗂', title: 'أرشيف المعلومات المضللة', desc: 'الوصول إلى قاعدة بيانات تضم حالات موثقة من المعلومات المضللة لأغراض البحث.' },
    { bg: bc4, icon: '🖼', title: 'التحقق من صحة الصورة', desc: 'تحقق من مصدر الصورة واكتشف التعديلات أو التلاعب بها.' },
  ].map((card, i) => (
    <div key={i} className="relative min-h-[230px]">
      <img
        src={card.bg}
        alt=""
        className="absolute inset-0 w-full h-full object-fill drop-shadow-xl"
      />
<div className="relative z-10 flex flex-col justify-center h-full min-h-[230px] p-12 text-right">
  <p className="font-bold text-base mb-4">{card.icon} {card.title}</p>
  <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
</div>
    </div>
  ))}
</div></div>




{/* Footer */}
<footer className="bg-[#faf7f5] border-t border-gray-200 px-12 pt-16 pb-6 mt-90">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

    {/* Brand */}
    <div>
      <h3 className="text-2xl font-bold tracking-wide mb-5">MANARA</h3>
      <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
        The digital infrastructure for truth in an age of fragmented information.
      </p>
    </div>

    {/* Platform */}
    <div>
      <p className="text-sm font-bold tracking-widest text-gray-900 mb-5">Platform</p>
      <ul className="space-y-4 text-gray-600 text-base">
        {['Investigations', 'Source Intelligence', 'Media Analysis', 'Verification Lab'].map((item) => (
          <li key={item} className="cursor-pointer hover:text-blue-600 transition">{item}</li>
        ))}
      </ul>
    </div>

    {/* Company */}
    <div>
      <p className="text-sm font-bold tracking-widest text-gray-900 mb-5">Company</p>
      <ul className="space-y-4 text-gray-600 text-base">
        {['Protocol', 'Security', 'Journalism Support', 'API Access'].map((item) => (
          <li key={item} className="cursor-pointer hover:text-blue-600 transition">{item}</li>
        ))}
      </ul>
    </div>

    {/* Connect */}
    <div>
      <p className="text-sm font-bold tracking-widest text-gray-900 mb-5">Connect</p>
      <div className="flex gap-3">
        {['🔗', '✉️', '⌨️'].map((icon, i) => (
          <div
            key={i}
            className="w-11 h-11 flex items-center justify-center border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            {icon}
          </div>
        ))}
      </div>
    </div>

  </div>

  {/* Bottom bar */}
  <div className="max-w-6xl mx-auto border-t border-gray-200 mt-12 pt-6">
    <p className="text-gray-400 text-sm tracking-wider">© 2026 MANARA GROUP. ALL RIGHTS RESERVED.</p>
  </div>
</footer>

</div>

  )
}

export default Landing