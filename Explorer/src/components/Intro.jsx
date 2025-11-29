import { BookOpen, MousePointer2, TerminalSquare } from 'lucide-react';

export default function Intro () {
  return (
    <div className='bg-white rounded-2xl p-8 mb-8 border border-slate-200 shadow-sm relative overflow-hidden'>
      <div className='absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-16 -mt-16 pointer-events-none'></div>

      <div className='relative z-10'>
        <h1 className='text-3xl md:text-4xl font-extrabold text-slate-800 mb-4'>
          Welcome to <span className='text-blue-600'>React Explorer</span> 👋
        </h1>

        <p className='text-lg text-slate-600 mb-8 max-w-2xl'>
          This isn't just a website—it's a playground! Every section below
          demonstrates a core React concept. Don't worry about understanding
          everything at once. Just scroll down and follow these 3 steps:
        </p>

        <div className='grid md:grid-cols-3 gap-4'>
          <div className='p-4 bg-blue-50 rounded-xl border border-blue-100 flex flex-col items-center text-center'>
            <div className='p-3 bg-white rounded-full shadow-sm mb-3'>
              <BookOpen className='w-6 h-6 text-blue-600' />
            </div>
            <h3 className='font-bold text-slate-800'>1. Read the Code</h3>
            <p className='text-sm text-slate-500 mt-1'>
              Look at how components and JSX are written.
            </p>
          </div>
          <div className='p-4 bg-purple-50 rounded-xl border border-purple-100 flex flex-col items-center text-center'>
            <div className='p-3 bg-white rounded-full shadow-sm mb-3'>
              <MousePointer2 className='w-6 h-6 text-purple-600' />
            </div>
            <h3 className='font-bold text-slate-800'>2. Interact</h3>
            <p className='text-sm text-slate-500 mt-1'>
              Click buttons and type in boxes to trigger updates.
            </p>
          </div>
          
          <div className='p-4 bg-orange-50 rounded-xl border border-orange-100 flex flex-col items-center text-center'>
            <div className='p-3 bg-white rounded-full shadow-sm mb-3'>
              <TerminalSquare className='w-6 h-6 text-orange-600' />
            </div>
            <h3 className='font-bold text-slate-800'>3. Check Console</h3>
            <p className='text-sm text-slate-500 mt-1'>
              Press <b>F12</b>. We log every action so you can see the logic
              flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
