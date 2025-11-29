import StudentCard from "./StudentCard";

export default function StudentList ({ students, toggleDetails, markAttendance, deleteStudent }) {
  if (students.length === 0) {
    return (
      <div className="text-center p-10 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl">
        <p className="text-slate-500 font-medium">No students found. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {students.map((student) => (
        <StudentCard
          key={student.id} 
          student={student}
          onToggle={toggleDetails}
          onMark={markAttendance}
          onDelete={deleteStudent}
        />
      ))}
    </div>
  );
};