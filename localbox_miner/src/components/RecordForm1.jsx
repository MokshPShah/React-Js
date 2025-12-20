import { useState, useEffect } from 'react';

const initialFormState = {
  name: '',
  value: '',
};

function RecordForm({ isEditing, currentRecord, addRecord, updateRecord, cancelEdit }) {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');

  // Effect to populate the form when entering Edit Mode
  useEffect(() => {
    if (isEditing && currentRecord) {
      setFormData({
        name: currentRecord.name,
        value: currentRecord.value,
      });
    } else {
      setFormData(initialFormState);
    }
    setError('');
  }, [isEditing, currentRecord]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error on input
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name || !formData.value) {
      setError('Both Name and Value fields are required.');
      return;
    }

    if (isEditing) {
      // Update Mode
      updateRecord({ ...currentRecord, ...formData });
    } else {
      // Add Mode
      addRecord(formData);
      setFormData(initialFormState); // Clear form after successful add
    }
  };

  return (
    <div className="record-form-container">
      <h3 className='text-amber-600'>{isEditing ? 'Edit Record' : 'Add New Record'}</h3>
      <form onSubmit={handleSubmit} className="record-form">
        <input
          type="text"
          name="name"
          placeholder="Record Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="value"
          placeholder="Value (Number)"
          value={formData.value}
          onChange={handleChange}
        />
        {error && <p className="error-message">{error}</p>}
        <div className="form-actions">
          <button type="submit">
            {isEditing ? 'Save Changes' : 'Add Record'}
          </button>
          {isEditing && (
            <button type="button" onClick={cancelEdit} className="cancel-button">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default RecordForm;