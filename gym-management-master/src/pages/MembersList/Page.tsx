import React, { useState, useEffect } from 'react';
import { Member } from '../../services/memberService';
import './components/memberlist.css';

interface MemberListPageProps {
    members: Member[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onAdd: (member: Member) => void;
    selectedMember: Member | null;
    onEditSubmit: (id: number, updatedMember: Member) => void;
    onAddNew: () => void; // Aggiungi questa props
}

const MemberListPage: React.FC<MemberListPageProps> = ({
                                                           members,
                                                           onEdit,
                                                           onDelete,
                                                           onAdd,
                                                           selectedMember,
                                                           onEditSubmit,
                                                           onAddNew,
                                                       }) => {
    const [member, setMember] = useState<Member>(
        selectedMember || { id: 0, name: '', username: '', description: '', avatarUrl: '', courses: [] }
    );

    useEffect(() => {
        if (selectedMember) {
            setMember(selectedMember);
        } else {
            setMember({ id: 0, name: '', username: '', description: '', avatarUrl: '', courses: [] });
        }
    }, [selectedMember]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMember({ ...member, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedMember) {
            onEditSubmit(selectedMember.id, member);
        } else {
            onAdd(member);
        }
        setMember({ id: 0, name: '', username: '', description: '', avatarUrl: '', courses: [] });
    };

    return (
        <div className="container">
            <h2>Members</h2>
            <button className="btn btn-primary mb-3" onClick={onAddNew}>Add New Member</button>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={member.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Name"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={member.username}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Username"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={member.description}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Description"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Avatar URL</label>
                    <input
                        type="text"
                        name="avatarUrl"
                        value={member.avatarUrl}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Avatar URL"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {selectedMember ? 'Edit' : 'Add'} Member
                </button>
            </form>
            <ul className="list-group">
                {members.map((member) => (
                    <li key={member.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span onClick={() => onEdit(member.id)}>
              {member.name} - {member.username}
            </span>
                        <div>
                            <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => onEdit(member.id)}>Edit</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(member.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MemberListPage;
