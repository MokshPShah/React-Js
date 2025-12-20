import RecordRow from './RecordRow';

function RecordList({ records, startEdit, deleteRecord, clearAllRecords }) {
  if (records.length === 0) {
    return (
      <div className="record-list-container">
        <p className="no-records-message">
          No Records Found. Start by adding a new one above!
        </p>
      </div>
    );
  }

  return (
    <div className="record-list-container">
      <h3>📊 Record List ({records.length} items)</h3>
      <table className="record-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
            <th>Date Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <RecordRow
              key={record.id}
              record={record}
              startEdit={startEdit}
              deleteRecord={deleteRecord}
            />
          ))}
        </tbody>
      </table>
      <button onClick={clearAllRecords} className="clear-button">
        Clear All Records
      </button>
    </div>
  );
}

export default RecordList;
