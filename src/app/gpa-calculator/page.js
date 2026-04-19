'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

export default function GPACalculator() {
  const [tab, setTab] = useState('gpa-to-percent')
  const [gpa, setGpa] = useState('')
  const [percent, setPercent] = useState('')
  const [subjects, setSubjects] = useState([{ credit: '', grade: '' }])
  const [result, setResult] = useState(null)

  const gradePoints = { 'A+': 4.0, 'A': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0 }

  const updateSubject = (i, field, value) => {
    const updated = [...subjects]
    updated[i] = { ...updated[i], [field]: value }
    setSubjects(updated)
  }

  const addSubject = () => setSubjects([...subjects, { credit: '', grade: '' }])

  const removeSubject = (i) => {
    if (subjects.length === 1) return // keep at least one row
    setSubjects(subjects.filter((_, idx) => idx !== i))
  }

  const convert = () => {
    setResult(null)
    if (tab === 'gpa-to-percent') {
      const g = parseFloat(gpa)
      if (isNaN(g) || g < 0 || g > 4) return
      setResult({ label: 'Percentage', value: ((g / 4.0) * 100).toFixed(2) + '%' })
    } else if (tab === 'percent-to-gpa') {
      const p = parseFloat(percent)
      if (isNaN(p)) return
      setResult({ label: 'GPA (4.0 scale)', value: (p / 100 * 4.0).toFixed(2) })
    } else {
      const totalPoints = subjects.reduce((sum, s) => {
        const gp = gradePoints[s.grade] ?? 0
        return sum + (parseFloat(s.credit) || 0) * gp
      }, 0)
      const totalCredits = subjects.reduce((sum, s) => sum + (parseFloat(s.credit) || 0), 0)
      setResult({ label: 'SGPA', value: totalCredits ? (totalPoints / totalCredits).toFixed(2) : '0.00' })
    }
  }

  return (
    <ToolLayout title="GPA & Percent Calculator" icon="🎓" description="GPA ↔ Percentage conversion and SGPA calculator">

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl">
        {[['gpa-to-percent','GPA → %'],['percent-to-gpa','% → GPA'],['sgpa','SGPA Calc']].map(([k, l]) => (
          <button key={k} onClick={() => { setTab(k); setResult(null) }}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${tab === k ? 'bg-white dark:bg-gray-600 shadow text-gray-600 dark:text-gray-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            {l}
          </button>
        ))}
      </div>

      {/* GPA → % */}
      {tab === 'gpa-to-percent' && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">GPA (0.00 - 4.00)</label>
          <input type="number" step="0.01" min="0" max="4" placeholder="e.g. 3.5" value={gpa}
            onChange={e => setGpa(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      )}

      {/* % → GPA */}
      {tab === 'percent-to-gpa' && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Percentage (%)</label>
          <input type="number" min="0" max="100" placeholder="e.g. 85" value={percent}
            onChange={e => setPercent(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      )}

      {/* SGPA */}
      {tab === 'sgpa' && (
        <div className="space-y-2">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1fr_auto] gap-2 px-1">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Credits</span>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Grade</span>
            <span className="w-8" />
          </div>

          {subjects.map((s, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
              {/* Credit input */}
              <input
                type="number"
                placeholder="e.g. 3"
                value={s.credit}
                onChange={e => updateSubject(i, 'credit', e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />

              {/* Grade select */}
              <select
                value={s.grade}
                onChange={e => updateSubject(i, 'grade', e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Grade</option>
                {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
              </select>

              {/* Remove button */}
              <button
                onClick={() => removeSubject(i)}
                disabled={subjects.length === 1}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-lg font-bold transition-all ${
                  subjects.length === 1
                    ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    : 'text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950'
                }`}
                title="Remove subject"
              >
                ×
              </button>
            </div>
          ))}

          {/* Add row */}
          <button
            onClick={addSubject}
            className="mt-1 text-sm text-blue-500 hover:text-blue-600 hover:underline flex items-center gap-1"
          >
            + Add Subject
          </button>
        </div>
      )}

      {/* Calculate */}
      <button onClick={convert}
        className="w-full mt-5 btn-primary">
        Calculate
      </button>

      {/* Result */}
      {result && (
        <div className="mt-4 p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">{result.label}</p>
          <p className="text-3xl font-bold text-gray-600 dark:text-gray-300 mt-1">{result.value}</p>
        </div>
      )}

    </ToolLayout>
  )
}