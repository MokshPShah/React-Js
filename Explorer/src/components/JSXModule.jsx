export default function JSXModule () {
  const greeting = 'Hello, React Explorer!'
  const showMessage = true
  console.log('rendering: <JSXModule />')

  return (
    <div className='p-6 bg-white rounded-xl shadow-sm border border-slate-200'>
      <div className='space-y-4'>
        <div className='p-4 bg-slate-50 rounded-lg'>
          <p className='text-sm text-slate-500 mb-2'>// 1. Dynamic Variables</p>
          <p className='text-blue-600 font-semibold'>{greeting}</p>
        </div>

        <div className='p-4 bg-slate-50 rounded-lg'>
          <p className='text-sm text-slate-500 mb-2'>
            // 2. Conditional Rendering
          </p>
          {showMessage ? (
            <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm'>
              Status: Active
            </span>
          ) : (
            <span>Hidden</span>
          )}
        </div>
      </div>
    </div>
  )
}