'use client'

import { useUsage } from '@/lib/useUsage.';
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react';

const CreateUser = () => {
    const { user } = useUser();
    const { userId, setUserId, resetUsage } = useUsage();

    const newUser = async () => {
        if (!user) {
            resetUsage();
        }
        if (userId) return;

        if (user?.id && user.emailAddresses.length > 0) {
            try {
                const res = await fetch('/api/create-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: user.id,
                        email: user.emailAddresses[0].emailAddress
                    }),
                });

                const data = await res.json();
                console.log(data.message || data.error);
                if (res) {
                    setUserId(user.id);
                    console.log(res);
                }
            } catch (error) {
                console.error('Failed to create user:', error);
            }
        }
    };

    useEffect(() => {
        newUser();
    }, [user]);

    return (
        <div>
        </div>
    );
}

export default CreateUser;
