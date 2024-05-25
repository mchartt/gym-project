import React from 'react';
import { Member } from '../../services/memberService';
import { Course } from '../../services/courseService';
import './components/HomePage.css';

interface HomePageProps {
    navigate: (page: string) => void;
    members: Member[];
    courses: Course[];
    selectedMember: Member | null;
    selectedCourse: Course | null;
    onSelectMember: (id: number) => void;
    onSelectCourse: (id: number) => void;
    onAddCourseToMember: (memberId: number, courseId: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({
                                               navigate,
                                               members,
                                               courses,
                                               selectedMember,
                                               selectedCourse,
                                               onSelectMember,
                                               onSelectCourse,
                                               onAddCourseToMember,
                                           }) => {
    return (
        <div className="home-page row">
            <div className="col-md-3">
                <h3>Members</h3>
                <ul className="list-group">
                    {members.map((member) => (
                        <li key={member.id} className="list-group-item" onClick={() => onSelectMember(member.id)}>
                            {member.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                <h3>Details</h3>
                {selectedMember && (
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{selectedMember.name}</h4>
                            <p className="card-text">Username: {selectedMember.username}</p>
                            <p className="card-text">Description: {selectedMember.description}</p>
                            <h4>Courses</h4>
                            <ul className="list-group">
                                {courses.map(course => (
                                    <li key={course.id} className="list-group-item">
                                        <input
                                            type="checkbox"
                                            checked={selectedMember.courses.includes(course.id)}
                                            onChange={() => onAddCourseToMember(selectedMember.id, course.id)}
                                        />
                                        {course.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                {selectedCourse && (
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{selectedCourse.name}</h4>
                            <p className="card-text">{selectedCourse.description}</p>
                            <p className="card-text">Start Date: {selectedCourse.startDate}</p>
                            <h4>Participants</h4>
                            <ul className="list-group">
                                {selectedCourse.participants.map(participantId => {
                                    const participant = members.find(member => member.id === participantId);
                                    return participant ? <li key={participant.id} className="list-group-item">{participant.name}</li> : null;
                                })}
                            </ul>
                        </div>
                    </div>
                )}
                {!selectedMember && !selectedCourse && <p>Select a member or course to see details</p>}
            </div>
            <div className="col-md-3">
                <h3>Courses</h3>
                <ul className="list-group">
                    {courses.map((course) => (
                        <li key={course.id} className="list-group-item" onClick={() => onSelectCourse(course.id)}>
                            {course.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
