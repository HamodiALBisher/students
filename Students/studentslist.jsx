import { Component } from "react";
import './student.css';
export default class studentslist extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isModalOpen: false,
          editingStudentId: null,
          newName: '',
          nameValidationError: '',
        };
      }
      
      handleDelete = (id) => {
        this.props.onDeleteStudent(id);
      };
      openEditModal = (studentId, currentName) => {
        this.setState({
          isModalOpen: true,
          editingStudentId: studentId,
          newName: currentName,
          nameValidationError: '', // Clear error message when modal opens
        });
      };
    
      closeEditModal = () => {
        this.setState({
          isModalOpen: false,
          editingStudentId: null,
          newName: '',
          nameValidationError: '', // Clear error message when modal closes
        });
      };
    
      handleNameChange = (event) => {
        this.setState({ newName: event.target.value, nameValidationError: '' }); // Clear error message as user types
      };
    
      saveEdit = () => {
        // Check if newName contains numbers
        if (/\d/.test(this.state.newName)) {
          this.setState({ nameValidationError: 'Name cannot contain numbers.' });
          return; // Stop the save operation
        }
    
        if (this.state.editingStudentId && this.state.newName.trim()) {
          this.props.onEditStudentName(this.state.editingStudentId, this.state.newName);
          this.closeEditModal(); // Close modal only if edit is successful
        }
      };
    
      render() {
        const { isModalOpen, newName, nameValidationError } = this.state;
        return (
          <div className="student-list-container">
            {isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                <span className="close" onClick={this.closeEditModal}>&times;</span>
                <p className="modal-title">Edit Name:</p> {/* Apply class for styling */}
                <input
                    type="text"
                    value={newName}
                    onChange={this.handleNameChange}
                    className={nameValidationError ? 'input-error' : ''}
                />
                <br />
                {nameValidationError && <div className="error-message">{nameValidationError}</div>}
                <button onClick={this.saveEdit}>Save Changes</button>
                </div>
            </div>
            )}
            <div className="student-list-count">count={this.props.students.length}</div>
            <div className="student-list-title">Students List</div>
            {this.props.students.map((student, index) => (
              <div className="student-item" key={student.id}>
                <div className="student-info">
                  <span className="student-index">{index + 1}.</span> {student.name} {student.grade}
                </div>
                <div className="student-actions">
                  <button onClick={() => this.openEditModal(student.id, student.name)} className="edit-button">🖊️</button>
                  <button onClick={() => this.handleDelete(student.id)} className="delete-button">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        );
      }
    }
