export interface Course {
    id: number;
    name: string;
    description: string;
    startDate: string;
    participants: number[];
}

const loadCourses = (): Course[] => {
    const coursesString = localStorage.getItem('courses');
    const courses = coursesString ? JSON.parse(coursesString) : [];
    return courses.map((course: any) => ({
        ...course,
        participants: Array.isArray(course.participants) ? course.participants : [],
    }));
};

let courses: Course[] = loadCourses();

export const getCourses = () => {
    return courses;
};

export const addCourse = (course: Course) => {
    course.id = courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    courses.push(course);
    saveCourses();
};

export const editCourse = (id: number, updatedCourse: Course) => {
    courses = courses.map(course => (course.id === id ? updatedCourse : course));
    saveCourses();
};

export const deleteCourse = (id: number) => {
    courses = courses.filter(course => course.id !== id);
    saveCourses();
};

export const addParticipantToCourse = (courseId: number, memberId: number) => {
    const course = courses.find(course => course.id === courseId);
    if (course && !course.participants.includes(memberId)) {
        course.participants.push(memberId);
        saveCourses();
    }
};

const saveCourses = () => {
    localStorage.setItem('courses', JSON.stringify(courses));
};
