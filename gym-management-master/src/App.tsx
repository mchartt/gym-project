import React, { useState, useEffect } from 'react';
import { getMembers, addMember, editMember, deleteMember, Member, usernameExists, addCourseToMember } from './services/memberService';
import { getCourses, addCourse, editCourse, deleteCourse, Course, addParticipantToCourse } from './services/courseService';
import HomePage from './pages/HomePage/Page';
import MemberListPage from './pages/MembersList/Page';
import CoursesListPage from './components/CoursesList';
import LoginPage from './pages/LoginPage';
import './App.css';
import { APP_VERSION, COLORS } from './version';

const App: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [currentPage, setCurrentPage] = useState<string>('home');
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        fetchMembers();
        fetchCourses();
    }, []);

    const fetchMembers = () => {
        const membersData = getMembers();
        setMembers(membersData);
        setLoading(false);
    };

    const fetchCourses = () => {
        const coursesData = getCourses();
        setCourses(coursesData);
        setLoading(false);
    };

    const handleAddMember = () => {
        setSelectedMember({ id: 0, name: '', username: '', description: '', avatarUrl: '', courses: [] });
        setCurrentPage('members');
    };

    const handleSaveMember = (member: Member) => {
        if (usernameExists(member.username, member.id)) {
            setErrorMessage('Username already exists!');
            return;
        }
        if (member.id === 0) {
            addMember(member);
        } else {
            editMember(member.id, member);
        }
        fetchMembers();
        setSelectedMember(null);
        setErrorMessage(null);
    };

    const handleEditMember = (id: number, updatedMember: Member) => {
        if (usernameExists(updatedMember.username, id)) {
            setErrorMessage('Username already exists!');
            return;
        }
        editMember(id, updatedMember);
        fetchMembers();
        setSelectedMember(null);
        setErrorMessage(null);
    };

    const handleDeleteMember = (id: number) => {
        deleteMember(id);
        fetchMembers();
        setErrorMessage(null);
    };

    const handleAddCourse = () => {
        setSelectedCourse({ id: 0, name: '', description: '', startDate: '', participants: [] });
        setCurrentPage('courses');
    };

    const handleSaveCourse = (course: Course) => {
        if (course.id === 0) {
            addCourse(course);
        } else {
            editCourse(course.id, course);
        }
        fetchCourses();
        setSelectedCourse(null);
        setErrorMessage(null);
    };

    const handleEditCourse = (id: number, updatedCourse: Course) => {
        editCourse(id, updatedCourse);
        fetchCourses();
        setSelectedCourse(null);
        setErrorMessage(null);
    };

    const handleDeleteCourse = (id: number) => {
        deleteCourse(id);
        fetchCourses();
        setErrorMessage(null);
    };

    const handleSelectMember = (id: number) => {
        const member = members.find(member => member.id === id) || null;
        setSelectedMember(member);
        setSelectedCourse(null);
        setErrorMessage(null);
    };

    const handleSelectCourse = (id: number) => {
        const course = courses.find(course => course.id === id) || null;
        setSelectedCourse(course);
        setSelectedMember(null);
        setErrorMessage(null);
    };

    const handleAddCourseToMember = (memberId: number, courseId: number) => {
        addCourseToMember(memberId, courseId);
        addParticipantToCourse(courseId, memberId);
        fetchMembers();
        fetchCourses();
    };

    const handleLogin = (username: string, password: string) => {
        if (username === 'ingrosso' && password === 'gestionale') {
            setIsAuthenticated(true);
            setErrorMessage(null);
        } else {
            setErrorMessage('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentPage('home');
        setSelectedMember(null);
        setSelectedCourse(null);
    };

    const renderPage = () => {
        if (!isAuthenticated) {
            return <LoginPage onLogin={handleLogin} errorMessage={errorMessage} />;
        }

        switch (currentPage) {
            case 'members':
                return (
                    <MemberListPage
                        members={members}
                        onEdit={handleSelectMember}
                        onDelete={handleDeleteMember}
                        onAdd={handleSaveMember}
                        selectedMember={selectedMember}
                        onEditSubmit={handleEditMember}
                        onAddNew={handleAddMember}
                    />
                );
            case 'courses':
                return (
                    <CoursesListPage
                        courses={courses}
                        members={members}
                        onEdit={handleSelectCourse}
                        onDelete={handleDeleteCourse}
                        onAdd={handleSaveCourse}
                        selectedCourse={selectedCourse}
                        onEditSubmit={handleEditCourse}
                        onAddParticipant={handleAddCourseToMember}
                        onAddNew={handleAddCourse}
                    />
                );
            default:
                return (
                    <HomePage
                        navigate={setCurrentPage}
                        members={members}
                        courses={courses}
                        selectedMember={selectedMember}
                        selectedCourse={selectedCourse}
                        onSelectMember={handleSelectMember}
                        onSelectCourse={handleSelectCourse}
                        onAddCourseToMember={handleAddCourseToMember}
                    />
                );
        }
    };

    if (loading) {
        return (
            <div className="loading-page">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <header className="header py-3 mb-4 border-bottom" style={{ backgroundColor: COLORS.dark, color: COLORS.white }}>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Gym Management Tool</h1>
                    {isAuthenticated && (
                        <nav>
                            <button className="btn btn-link text-white" style={{ color: COLORS.white }} onClick={() => setCurrentPage('home')}>Home</button>
                            <button className="btn btn-link text-white" style={{ color: COLORS.white }} onClick={() => setCurrentPage('members')}>Members</button>
                            <button className="btn btn-link text-white" style={{ color: COLORS.white }} onClick={() => setCurrentPage('courses')}>Courses</button>
                            <button className="btn btn-link text-white" style={{ color: COLORS.white }} onClick={handleLogout}>Logout</button>
                        </nav>
                    )}
                </div>
                {isAuthenticated && <div className="text-muted">Version: {APP_VERSION}</div>}
            </header>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {renderPage()}
        </div>
    );
};

export default App;
