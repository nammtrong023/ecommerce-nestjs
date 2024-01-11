import { create } from 'zustand';

interface ISearchState {
    query: string;
    setQuery: (query: string) => void;
}

const useSearchStore = create<ISearchState>((set) => ({
    query: '',
    setQuery: (state) => set({ query: state }),
}));

export { useSearchStore };
