export interface Member {
    id: number;
    name: string;
    username: string;
    description: string;
    avatarUrl: string;
    courses: number[];
}

const loadMembers = (): Member[] => {
    const membersString = localStorage.getItem('members');
    const members = membersString ? JSON.parse(membersString) : [];
    return members.map((member: any) => ({
        ...member,
        courses: Array.isArray(member.courses) ? member.courses : [],
    }));
};

let members: Member[] = loadMembers();

export const getMembers = () => {
    return members;
};

export const addMember = (member: Member) => {
    members.push(member);
    saveMembers();
};

export const editMember = (id: number, updatedMember: Member) => {
    members = members.map(member => (member.id === id ? updatedMember : member));
    saveMembers();
};

export const deleteMember = (id: number) => {
    members = members.filter(member => member.id !== id);
    saveMembers();
};

export const usernameExists = (username: string, id?: number) => {
    return members.some(member => member.username === username && member.id !== id);
};

export const addCourseToMember = (memberId: number, courseId: number) => {
    const member = members.find(member => member.id === memberId);
    if (member && !member.courses.includes(courseId)) {
        member.courses.push(courseId);
        saveMembers();
    }
};

const saveMembers = () => {
    localStorage.setItem('members', JSON.stringify(members));
};
