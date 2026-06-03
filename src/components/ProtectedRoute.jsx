import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    // افحص الجلسة الحالية
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    // اسمع لأي تغيير بالجلسة (تسجيل دخول/خروج)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // بينما يفحص الجلسة، اعرض شاشة تحميل
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        جاري التحميل...
      </div>
    )
  }

  // لو ما في جلسة، حوّل للـ login
  if (!session) {
    return <Navigate to="/login" replace />
  }

  // في جلسة → اعرض الصفحة
  return children
}

export default ProtectedRoute