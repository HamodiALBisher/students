import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Students from '../Students/students';
import StudentList from '../Students/studentslist';

function App() {
  const [students, setStudents] = useState([]);

  const addStudent = (newStudent) => {
    setStudents([...students, { ...newStudent, id: Date.now() }]);
  };

  const deleteStudent = (studentId) => {
    setStudents(students.filter(student => student.id !== studentId));
  };

  const editStudentName = (studentId, newName) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, name: newName } : student
    ));
  };

  return (
    <div>
      <Students onAddStudent={addStudent} />
      <StudentList 
        students={students} 
        onDeleteStudent={deleteStudent} 
        onEditStudentName={editStudentName} 
      />
    </div>
  );
}

export default App
