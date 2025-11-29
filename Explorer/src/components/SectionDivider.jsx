export default function SectionDivider ({ title, icon: Icon, color }) {
  return (
    <div className='mt-12 mb-6 border-b border-slate-200 pb-2 flex items-center gap-3'>
      <div
        className={`p-2 rounded-lg bg-white shadow-sm border border-slate-100 ${color}`}
      >
        <Icon className='w-6 h-6' />
      </div>
      <h2 className='text-2xl font-bold text-slate-800'>{title}</h2>
    </div>
  )
}
