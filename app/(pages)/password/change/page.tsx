"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      try {
        const response = await fetch(`http://localhost:4200/api/password-reset/reset?token=${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newPassword }),
        });

        if (response.ok) {
          setMessage('Password reset successful');
        } else {
          setMessage('Error resetting password');
        }
      } catch (error) {
        setMessage('Error resetting password');
      }
      window.location.href = "/auth/customers/signin";
    } else {
      setMessage('Invalid token');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
