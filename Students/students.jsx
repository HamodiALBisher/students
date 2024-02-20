import React, { Component } from 'react';
import './student.css';
export default class Students extends Component {
    constructor(props) {
      super(props);
      this.state = {
        newStudent: { name: '', grade: '' },
        nameErrorMessage: '', // To store the error message related to the name validation
        gradeErrorMessage: '', // To store the error message related to the grade validation
      };
    }
  
    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState((prevState) => ({
        newStudent: {
          ...prevState.newStudent,
          [name]: value
        },
        nameErrorMessage: '', // Clear name error message on input change
        gradeErrorMessage: '', // Clear grade error message on input change
      }));
    };
  
    handleAddStudent = () => {
      const { newStudent } = this.state;
      let isValid = true;
  
      if (/\d/.test(newStudent.name)) { // Check if the name contains numbers
        this.setState({ nameErrorMessage: 'Name cannot contain numbers.' });
        isValid = false;
      } else {
        this.setState({ nameErrorMessage: '' }); // Clear any existing error messages for name
      }
  
      if (!/^\d+$/.test(newStudent.grade)) { // Check if the grade contains only numbers
        this.setState({ gradeErrorMessage: 'Grade must be a number.' });
        isValid = false;
      } else {
        this.setState({ gradeErrorMessage: '' }); // Clear any existing error messages for grade
      }
  
      if (isValid) {
        // Assuming you have a method to add the student
        this.props.onAddStudent(newStudent);
        this.setState({
          newStudent: { name: '', grade: '' }, // Reset the input fields
        });
      }
    };
  
    render() {
      const { name, grade } = this.state.newStudent;
      const { nameErrorMessage, gradeErrorMessage } = this.state;
  
      return (
        <div className="students-container">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={this.handleChange}
            className={`students-input ${nameErrorMessage ? 'input-error' : ''}`} // Apply error class conditionally for name
          />
          {nameErrorMessage && <div className="error-message">{nameErrorMessage}</div>} {/* Display name error message if it exists */}
          
          <input
            type="number"
            name="grade"
            placeholder="Grade"
            value={grade}
            onChange={this.handleChange}
            className={`students-input ${gradeErrorMessage ? 'input-error' : ''}`} // Apply error class conditionally for grade
          />
          {gradeErrorMessage && <div className="error-message">{gradeErrorMessage}</div>} {/* Display grade error message if it exists */}
  
          <button onClick={this.handleAddStudent} className="students-button">
            Add Student
          </button>
        </div>
      );
    }
  }

