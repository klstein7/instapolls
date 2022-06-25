import create from 'zustand';

type ShowResultsState = {
  showResults: boolean;
  setShowResults: (showResults: boolean) => void;
};

const useShowResults = create<ShowResultsState>((set) => ({
  showResults: false,
  setShowResults: (showResults: boolean) => set((state) => ({ ...state, showResults })),
}));

export default useShowResults;
