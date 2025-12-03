import React, { useState, useRef } from 'react';
import DynamicList from './DynamicList';

const FeedbackForm = ({ onAddFeedback }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    category: 'Bug',
    priority: 'Medium',
    description: '',
    steps: [''],
    suggestions: ['']
  });

  const [errors, setErrors] = useState({});
  const screenshotRef = useRef();
  const notesRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleDynamicChange = (field, index, value) => {
    const updatedList = [...formData[field]];
    updatedList[index] = value;
    setFormData({ ...formData, [field]: updatedList });
  };

  const addDynamicRow = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeDynamicRow = (field, index) => {
    const updatedList = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedList });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Required field";
    if (!formData.email.match(/\S+@\S+\.\S+/)) tempErrors.email = "Invalid email";
    if (formData.description.length < 10) tempErrors.description = "Too short (min 10)";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newFeedback = {
      id: Date.now(),
      ...formData,
      screenshotUrl: screenshotRef.current.value,
      additionalNotes: notesRef.current.value,
      timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString('en-US', { hour12: true })
    };

    onAddFeedback(newFeedback);
    setFormData({ fullName: '', email: '', category: 'Bug', priority: 'Medium', description: '', steps: [''], suggestions: [''] });
    screenshotRef.current.value = "";
    notesRef.current.value = "";
  };
  
  const glassPanel = "bg-gray-800 bg-opacity-40 backdrop-filter backdrop-blur-lg border border-gray-700 shadow-2xl rounded-2xl p-8";
  const inputBase = "w-full bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300";
  const inputError = "border-pink-500 focus:border-pink-500 focus:ring-pink-500";
  const labelStyle = "block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2";

  return (
    <div className={`${glassPanel} mb-16 relative overflow-hidden group`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>

      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
        Submit Report
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className={labelStyle}>Full Name: *</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} className={`${inputBase} ${errors.fullName ? inputError : ''}`} type="text" placeholder="Agent Name" />
            {errors.fullName && <p className="text-pink-500 text-xs mt-1 font-mono">{errors.fullName}</p>}
          </div>
          <div>
            <label className={labelStyle}>Email Address: *</label>
            <input name="email" value={formData.email} onChange={handleChange} className={`${inputBase} ${errors.email ? inputError : ''}`} type="email" placeholder="agent@hq.com" />
            {errors.email && <p className="text-pink-500 text-xs mt-1 font-mono">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className={labelStyle}>Issue Category:</label>
            <select name="category" value={formData.category} onChange={handleChange} className={`${inputBase} appearance-none cursor-pointer`}>
              <option>Bug</option>
              <option>Suggestion</option>
              <option>Complaint</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className={labelStyle}>Priority Level:</label>
            <div className="flex gap-2 mt-1">
              {['Low', 'Medium', 'High'].map((level) => (
                <label key={level} className={`flex-1 text-center py-2.5 rounded cursor-pointer transition-all duration-300 text-sm font-bold tracking-wide border ${formData.priority === level 
                  ? level === 'High' ? 'bg-pink-600 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]' 
                  : level === 'Medium' ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                  : 'bg-cyan-600 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                  : 'bg-gray-900 border-gray-700 text-gray-500 hover:border-gray-500'}`}>
                  <input type="radio" name="priority" value={level} checked={formData.priority === level} onChange={handleChange} className="hidden" />
                  {level}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label className={labelStyle}>Description: *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className={`${inputBase} h-32`} placeholder="Describe the system failure..."></textarea>
          {errors.description && <p className="text-pink-500 text-xs mt-1 font-mono">{errors.description}</p>}
        </div>

        <div className="space-y-8 mb-8">
            <DynamicList label="Steps to Reproduce" items={formData.steps} placeholder="eg. 1. Click Login..." 
              onItemChange={(i, v) => handleDynamicChange('steps', i, v)} onAddItem={() => addDynamicRow('steps')} onRemoveItem={(i) => removeDynamicRow('steps', i)} inputBase={inputBase} labelStyle={labelStyle} />

            <DynamicList label="Suggestions" items={formData.suggestions} placeholder="eg. 1. Make button blue..." 
              onItemChange={(i, v) => handleDynamicChange('suggestions', i, v)} onAddItem={() => addDynamicRow('suggestions')} onRemoveItem={(i) => removeDynamicRow('suggestions', i)} inputBase={inputBase} labelStyle={labelStyle} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pt-6 border-t border-gray-700">
          <div>
            <label className={labelStyle}>Attach Screenshot(URL)</label>
            <input ref={screenshotRef} type="text" placeholder="https://..." className={inputBase} />
          </div>
          <div>
            <label className={labelStyle}>Additional Notes:</label>
            <input ref={notesRef} type="text" placeholder="..." className={inputBase} />
          </div>
        </div>

        <button type="submit" className="w-full relative group overflow-hidden bg-cyan-600 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]">
            <span className="absolute w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -translate-x-full group-hover:animate-shine"></span>
            Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;