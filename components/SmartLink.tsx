'use client';

import { useProgressStore } from '@/lib/useProgressBar';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

type SmartLinkProps = LinkProps & {
    children: ReactNode;
    title?: string;
    className?: string;
    target?: string;
};

export default function SmartLink({ target, title = '', children, ...props }: SmartLinkProps) {
    const start = useProgressStore((state) => state.start);
    const pathname = usePathname();
    const [isPrefetch, setIsPrefetch] = useState(props.prefetch || true);

    const handleClick = () => {
        const href = (props.href as string).split('?')[0]
        if (href !== pathname) {
            start();
        }
    };

    return (
        <Link
            {...props}
            onClick={() => {
                handleClick()
            }}
            onMouseEnter={() => setIsPrefetch(true)}
            prefetch={isPrefetch}
            title={title}
            target={target}
        >
            {children}
        </Link>
    );
}
