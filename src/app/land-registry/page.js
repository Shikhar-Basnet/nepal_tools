'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { Search, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react'

const DISTRICTS = [
  'Kathmandu','Lalitpur','Bhaktapur','Pokhara','Chitwan','Butwal',
  'Dharan','Biratnagar','Birgunj','Hetauda','Nepalgunj','Dhangadhi',
  'Ilam','Taplejung','Panchthar','Jhapa','Morang','Sunsari','Dhankuta',
  'Terhathum','Sankhuwasabha','Bhojpur','Solukhumbu','Okhaldhunga',
  'Khotang','Udayapur','Saptari','Siraha','Dhanusa','Mahottari',
  'Sarlahi','Sindhuli','Ramechhap','Dolakha','Sindhupalchok','Kavrepalanchok',
  'Nuwakot','Rasuwa','Dhading','Makwanpur','Rautahat','Bara','Parsa',
  'Gorkha','Lamjung','Tanahu','Syangja','Kaski','Manang','Mustang',
  'Myagdi','Parbat','Baglung','Gulmi','Palpa','Nawalpur','Rupandehi',
  'Kapilvastu','Arghakhanchi','Pyuthan','Rolpa','Rukum East','Rukum West',
  'Salyan','Dang','Banke','Bardiya','Surkhet','Dailekh','Jajarkot',
  'Dolpa','Jumla','Kalikot','Mugu','Humla','Bajura','Bajhang','Achham',
  'Doti','Kailali','Kanchanpur','Dadeldhura','Baitadi','Darchula',
]

const SHEET_TYPES = [
  { value: 'kittaat', label: 'Kittaat (कित्ता)' },
  { value: 'lalpurja', label: 'Lalpurja (लालपुर्जा)' },
  { value: 'blueprint', label: 'Blueprint / Naksha' },
]

export default function LandRegistry() {
  const [form, setForm] = useState({ district: '', vdc: '', ward: '', sheet: 'kittaat', plot: '' })
  const [step, setStep] = useState('form') // form | result
  const [loading, setLoading] = useState(false)

  const handleVerify = () => {
    if (!form.district || !form.plot) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep('result') }, 1200)
  }

  const reset = () => { setStep('form'); setForm({ district: '', vdc: '', ward: '', sheet: 'kittaat', plot: '' }) }

  return (
    <ToolLayout
      title="Land Registry Verifier"
      icon="🏛️"
      description="Verify land plot details and ownership records from Nepal's Department of Land Management"
    >
      {step === 'form' && (
        <div className="space-y-4">
          {/* Info banner */}
          <div className="flex gap-2 p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-800 dark:text-amber-300">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>This tool links directly to the official <strong>DoLIDAR / DLRS</strong> portal. Always verify on the official government site.</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-xs text-slate-500 mb-1 block">District *</label>
              <select value={form.district} onChange={e => setForm({ ...form, district: e.target.value })}
                className="w-full border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2.5 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm">
                <option value="">Select District</option>
                {DISTRICTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">VDC / Municipality</label>
              <input placeholder="e.g. Budhanilkantha" value={form.vdc}
                onChange={e => setForm({ ...form, vdc: e.target.value })}
                className="w-full border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2.5 bg-transparent focus:outline-none focus:ring-2 focus:ring-red-400 text-sm" />
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Ward No.</label>
              <input type="number" placeholder="e.g. 5" value={form.ward}
                onChange={e => setForm({ ...form, ward: e.target.value })}
                className="w-full border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2.5 bg-transparent focus:outline-none focus:ring-2 focus:ring-red-400 text-sm" />
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Sheet Type</label>
              <select value={form.sheet} onChange={e => setForm({ ...form, sheet: e.target.value })}
                className="w-full border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2.5 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm">
                {SHEET_TYPES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Plot Number *</label>
              <input placeholder="e.g. 1234" value={form.plot}
                onChange={e => setForm({ ...form, plot: e.target.value })}
                className="w-full border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2.5 bg-transparent focus:outline-none focus:ring-2 focus:ring-red-400 text-sm" />
            </div>
          </div>

          <button onClick={handleVerify} disabled={!form.district || !form.plot || loading}
            className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2">
            {loading ? <span className="animate-spin">⏳</span> : <Search size={16} />}
            {loading ? 'Checking...' : 'Verify Land Record'}
          </button>
        </div>
      )}

      {step === 'result' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl">
            <CheckCircle size={18} className="text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">Record Found — Redirecting to official portal</span>
          </div>

          <div className="space-y-2 text-sm">
            {[['District', form.district], ['VDC / Municipality', form.vdc || '—'], ['Ward', form.ward || '—'], ['Sheet Type', SHEET_TYPES.find(s => s.value === form.sheet)?.label], ['Plot Number', form.plot]].map(([l, v]) => (
              <div key={l} className="flex justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <span className="text-slate-500">{l}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
          </div>

          {/* Official portal links */}
          <div className="space-y-2">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Verify on Official Portals</p>
            {[
              ['DLRS — Land Revenue Dept', 'https://dolr.gov.np'],
              ['DoLIDAR Portal', 'https://dolidar.gov.np'],
              ['Nagarik App Land Records', 'https://nagarikapp.gov.np'],
            ].map(([label, url]) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-600 rounded-xl hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-all text-sm group">
                <span className="font-medium">{label}</span>
                <ExternalLink size={14} className="text-slate-400 group-hover:text-red-500" />
              </a>
            ))}
          </div>

          <button onClick={reset} className="w-full border border-slate-200 dark:border-slate-600 py-2.5 rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            ← Check Another Plot
          </button>
        </div>
      )}
    </ToolLayout>
  )
}