import { useEffect, useState } from "react"

export default function LifecycleModule () {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  useEffect(() => {
    let intervalId = null

    if (isRunning) {
      console.log('▶️ Lifecycle: Timer Started')
      intervalId = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    } else {
      if (seconds !== 0) console.log('⏸️ Lifecycle: Timer Paused')
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isRunning])

  useEffect(() => {
    if (seconds > 0 && isRunning) {
      console.log(`⏱️ Tick: ${seconds}s`)
    }
  }, [seconds, isRunning])

  const handleStart = () => setIsRunning(true)
  const handleStop = () => setIsRunning(false)
  const handleReset = () => {
    console.log('⏹️ Lifecycle: Timer Reset to 0')
    setIsRunning(false)
    setSeconds(0)
  }

  return (
    <div className='p-6 bg-white rounded-xl shadow-sm border border-slate-200'>
      <div className='flex flex-col md:flex-row items-center gap-8'>
        <div
          className={`flex items-center justify-center w-32 h-32 rounded-full border-4 transition-all ${
            isRunning
              ? 'border-red-500 bg-red-50'
              : 'border-slate-200 bg-slate-50'
          }`}
        >
          <span className='text-4xl font-bold text-slate-800'>{seconds}s</span>
        </div>
        <div className='flex-1 space-y-4'>
          <div>
            <h3 className='text-lg font-bold text-slate-800'>Timer Controls</h3>
            <p className='text-sm text-slate-500'>
              Uses <code>useEffect</code> to manage intervals based on state.
            </p>
          </div>

          <div className='flex gap-3'>
            {!isRunning ? (
              <button
                onClick={handleStart}
                className='px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-sm transition-colors cursor-pointer'
              >
                Start
              </button>
            ) : (
              <button
                onClick={handleStop}
                className='px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold shadow-sm transition-colors cursor-pointer'
              >
                Stop
              </button>
            )}

            <button
              onClick={handleReset}
              className='px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold transition-colors cursor-pointer'
            >
              Reset
            </button>
          </div>

          <p className='text-xs text-slate-400 font-mono'>
            Status: {isRunning ? 'Running (Check Console)' : 'Stopped'}
          </p>
        </div>
      </div>
    </div>
  )
}