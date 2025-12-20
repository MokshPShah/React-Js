function RecordRow({ record, startEdit, deleteRecord }) {
  const { id, name, value, date } = record;

  return (
    <tr>
      <td data-label="ID">{id}</td>
      <td data-label="Name">{name}</td>
      <td data-label="Value">{value}</td>
      <td data-label="Date Added">{date}</td>
      <td data-label="Actions" className="actions-cell">
        <button onClick={() => startEdit(id)} className="edit-button">
          Edit
        </button>
        <button onClick={() => deleteRecord(id)} className="delete-button">
          Delete
        </button>
      </td>
    </tr>
  );
}

export default RecordRow;