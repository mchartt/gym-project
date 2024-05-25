import React, { useState } from 'react';
import './LoginPage.css';

interface LoginPageProps {
    onLogin: (username: string, password: string) => void;
    errorMessage: string | null;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, errorMessage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
