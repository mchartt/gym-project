import React from 'react';
import { Member } from '../../services/memberService';
import './components/MemberDetail.css';

interface MembersDetailProps {
    member: Member | null;
    onEdit: () => void;
    onDelete: () => void;
}

const MembersDetail: React.FC<MembersDetailProps> = ({ member, onEdit, onDelete }) => {
    if (!member) {
        return <div className="member-detail">Select a member to see the details</div>;
    }

    return (
        <div className="member-detail">
            <img src={member.avatarUrl} alt={member.name} className="avatar" />
            <h2>{member.name}</h2>
            <p>{member.username}</p>
            <p>{member.description}</p>
            <button onClick={onEdit} className="edit-button">Edit</button>
            <button onClick={onDelete} className="delete-button">Delete</button>
        </div>
    );
};

export default MembersDetail;


