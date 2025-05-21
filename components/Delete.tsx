'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteHistory } from "@/lib/actions";
import { Check, Loader, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Delete = ({ historyId }: { historyId: number }) => {
    const router = useRouter();
    const [res, setRes] = useState<string>('');
    const [load, setLoad] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleDelete = async () => {
        setLoad(true)
        try {
            const res = await fetch('/api/delete-history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ historyId }),
            });

            const data = await res.json();
            setRes(data.message || data.error);
            router.refresh();
        } catch (err) {
            console.log('Something went wrong' + err);
            setRes((err as Error).message);
        } finally {
            setLoad(false);
            setIsOpen(false);
        }
    }
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogTrigger asChild>
                <abbr title={res || 'Delete'}> <Button size={'icon'} variant={'secondary'} onClick={() => setIsOpen(true)}>
                    {res ? res === 'Deleted Successfully' ? <Check /> : res : <Trash />}
                </Button>
                </abbr>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        history and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>{load && <Loader className="animate-spin mr-1" />} Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
};
export default Delete;

