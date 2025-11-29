import React, { useState, useEffect, Component } from 'react'
import {
  Code2,
  Box,
  List,
  MessageSquare,
  Activity,
  Layers,
  Terminal
} from 'lucide-react'
import Intro from './components/Intro'
import ClassComponentModule from './components/ClassComponentModule'
import SectionDivider from './components/SectionDivider'
import JSXModule from './components/JSXModule'
import PropsStateModule from './components/PropsStateModule'
import ListModule from './components/ListModule'
import FormModule from './components/FormModule'
import LifecycleModule from './components/LifecycleModule'


const App = () => {
  return (
    <div className='min-h-screen bg-slate-50 font-sans text-slate-900 pb-6'>

      <main className='max-w-4xl mx-auto px-6 pt-6'>
       <Intro />

        {/* 1. JSX */}
        <SectionDivider
          title='1. JSX & Rendering'
          icon={Code2}
          color='text-blue-500'
        />
        <JSXModule />

        {/* 2. Props & State */}
        <SectionDivider
          title='2. Props & State'
          icon={Box}
          color='text-indigo-500'
        />
        <PropsStateModule />

        {/* 3. Lists */}
        <SectionDivider
          title='3. Lists & Filtering'
          icon={List}
          color='text-purple-500'
        />
        <ListModule />

        {/* 4. Forms */}
        <SectionDivider
          title='4. Forms & Events'
          icon={MessageSquare}
          color='text-orange-500'
        />
        <FormModule />

        {/* 5. Lifecycle */}
        <SectionDivider
          title='5. Lifecycle (useEffect)'
          icon={Activity}
          color='text-red-500'
        />
        <LifecycleModule />

        {/* 6. Class Components */}
        <SectionDivider
          title='6. Class Components'
          icon={Layers}
          color='text-teal-500'
        />
        <ClassComponentModule />
      </main>

      <footer className='text-center text-slate-400 pt-12'>
        <p>Made With ❤️ By Moksh </p>
      </footer>
    </div>
  )
}

export default App
