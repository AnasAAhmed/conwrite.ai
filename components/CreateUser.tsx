'use client'
import { createUser } from '@/lib/actions';
import { useUsage } from '@/lib/useUsage.';
import { useUser } from '@clerk/nextjs';
import React, { useCallback, useEffect } from 'react'

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
                const res = await createUser({ userId: user.id, email: user.emailAddresses[0].emailAddress });
                setUserId(user.id)
                console.log(res);
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
    )
}

export default CreateUser
