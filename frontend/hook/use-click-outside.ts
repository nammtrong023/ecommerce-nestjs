import { useEffect } from 'react';

interface ClickOutSideProps {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    toggleOpen?: (state: boolean) => void;
    nodeRef: React.RefObject<HTMLDivElement>;
    nodeRef2: React.RefObject<HTMLDivElement>;
}

export const useClickOutside = ({
    isOpen,
    nodeRef,
    nodeRef2,
    setIsOpen,
}: ClickOutSideProps) => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                nodeRef.current &&
                !nodeRef.current.contains(event.target as Node) &&
                nodeRef2.current &&
                !nodeRef2.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, nodeRef, nodeRef2, setIsOpen]);
};
