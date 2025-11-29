import { useState } from "react"

export default function ListModule () {
  const [search, setSearch] = useState('')
  const initialTech = [
    { id: 1, name: 'React', type: 'Library' },
    { id: 2, name: 'Angular', type: 'Framework' },
    { id: 3, name: 'Vue', type: 'Framework' },
    { id: 4, name: 'Svelte', type: 'Compiler' },
    { id: 5, name: 'Next.js', type: 'Meta-Framework' }
  ]

  const filteredList = initialTech.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSearch = e => {
    const val = e.target.value
    console.log(`⌨️ Input: Search term updated: "${val}"`)
    setSearch(val)
  }

  return (
    <div className='p-6 bg-white rounded-xl shadow-sm border border-slate-200'>
      <input
        type='text'
        placeholder='Type to filter list...'
        value={search}
        onChange={handleSearch}
        className='w-full p-3 mb-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all'
      />

      <ul className='space-y-2'>
        {filteredList.length > 0 ? (
          filteredList.map(tech => (
            <li
              key={tech.id}
              className='flex justify-between items-center p-3 bg-slate-50 hover:bg-purple-50 rounded-lg border border-transparent hover:border-purple-200 transition-all'
            >
              <span className='font-semibold text-slate-700'>{tech.name}</span>
              <span className='text-xs px-2 py-1 bg-white border border-slate-200 rounded text-slate-500'>
                {tech.type}
              </span>
            </li>
          ))
        ) : (
          <li className='text-center text-slate-400 py-4'>
            No results found for "{search}"
          </li>
        )}
      </ul>
      <p className='text-xs text-right text-slate-400 mt-2'>
        Check console to see filter events
      </p>
    </div>
  )
}