import React, { useState, useEffect } from 'react';
import { Course } from '../services/courseService';
import { Member } from '../services/memberService';


interface CoursesListPageProps {
    courses: Course[];
    members: Member[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onAdd: (course: Course) => void;
    selectedCourse: Course | null;
    onEditSubmit: (id: number, updatedCourse: Course) => void;
    onAddParticipant: (courseId: number, memberId: number) => void;
    onAddNew: () => void;
}

const CoursesListPage: React.FC<CoursesListPageProps> = ({
                                                             courses,
                                                             members,
                                                             onEdit,
                                                             onDelete,
                                                             onAdd,
                                                             selectedCourse,
                                                             onEditSubmit,
                                                             onAddParticipant,
                                                             onAddNew,
                                                         }) => {
    const [course, setCourse] = useState<Course>(
        selectedCourse || { id: 0, name: '', description: '', startDate: '', participants: [] }
    );
    const [selectedMemberId, setSelectedMemberId] = useState<number | ''>('');

    useEffect(() => {
        if (selectedCourse) {
            setCourse(selectedCourse);
        } else {
            setCourse({ id: 0, name: '', description: '', startDate: '', participants: [] });
        }
    }, [selectedCourse]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCourse) {
            onEditSubmit(selectedCourse.id, course);
        } else {
            onAdd(course);
        }
        setCourse({ id: 0, name: '', description: '', startDate: '', participants: [] });
    };

    const handleAddParticipant = () => {
        if (selectedCourse && selectedMemberId !== '') {
            onAddParticipant(selectedCourse.id, selectedMemberId as number);
            setSelectedMemberId('');
        }
    };

    return (
        <div>
            <h2>Courses</h2>
            <button className="btn btn-primary mb-3" onClick={onAddNew}>Add New Course</button>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="mb-3">
                    <label className="form-label">Course Name</label>
                    <input
                        type="text"
                        name="name"
                        value={course.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Course Name"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Course Description</label>
                    <input
                        type="text"
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Course Description"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={course.startDate}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Start Date"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {selectedCourse ? 'Edit' : 'Add'} Course
                </button>
            </form>
            <ul className="list-group mb-3">
                {courses.map((course) => (
                    <li key={course.id} className="list-group-item" onClick={() => onEdit(course.id)}>
                        <div className="d-flex justify-content-between">
                            <div>
                                {course.name} - {course.description} - Start Date: {course.startDate}
                            </div>
                            <div>
                                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => onEdit(course.id)}>Edit</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(course.id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {selectedCourse && (
                <div>
                    <h3>Participants</h3>
                    <ul className="list-group mb-3">
                        {selectedCourse.participants.map((participantId) => {
                            const participant = members.find((member) => member.id === participantId);
                            return participant ? <li key={participant.id} className="list-group-item">{participant.name}</li> : null;
                        })}
                    </ul>
                    <h3>Add Participant</h3>
                    <div className="input-group mb-3">
                        <select
                            className="form-select"
                            value={selectedMemberId}
                            onChange={(e) => setSelectedMemberId(Number(e.target.value))}
                        >
                            <option value="">Select a member</option>
                            {members.map((member) => (
                                <option key={member.id} value={member.id}>
                                    {member.name}
                                </option>
                            ))}
                        </select>
                        <button className="btn btn-primary" onClick={handleAddParticipant}>
                            Add Participant
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoursesListPage;
