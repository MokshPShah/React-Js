import React, { useState, useRef, Fragment } from 'react';
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

const App = () => {
  const [students, setStudents] = useState([]);

  const addStudent = (name) => {
    const newStudent = {
      id: Date.now(), 
      name: name,
      isDetailsVisible: false,
      status: null,
    };
    setStudents([...students, newStudent]);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const toggleDetails = (id) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, isDetailsVisible: !student.isDetailsVisible } : student
    ));
  };

  const markAttendance = (id, status) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, status: status } : student
    ));
  };

  const totalStudents = students.length;
  const presentCount = students.filter(s => s.status === 'Present').length;
  const absentCount = students.filter(s => s.status === 'Absent').length;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-2xl mx-auto">
        
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Student Activity Manager</h1>
          <p className="text-slate-500">Manage classroom attendance and records dynamically.</p>
        </header>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Fragment>
            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total</p>
              <p className="text-2xl font-bold text-slate-800">{totalStudents}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Present</p>
              <p className="text-2xl font-bold text-green-600">{presentCount}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Absent</p>
              <p className="text-2xl font-bold text-red-600">{absentCount}</p>
            </div>
          </Fragment>
        </div>

        <StudentForm onAdd={addStudent} />
        
        <StudentList 
          students={students}
          toggleDetails={toggleDetails}
          markAttendance={markAttendance}
          deleteStudent={deleteStudent}
        />

      </div>
    </div>
  );
};

export default App;