"use client"; 

import React, { useState } from 'react';

const RequestReset = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4200/api/password-reset/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Password reset email sent');
      } else {
        setMessage('Error sending password reset email');
      }
    } catch (error) {
      setMessage('Error sending password reset email');
    }
  };

  return (
    <div>
      <h1>Request Password Reset</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestReset;
