import type { ChangeEvent } from 'react';

const Search = ({ searchTask }: { searchTask: (value: string) => void }) => {
    
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        searchTask(e.target.value);
    };

    return (
        <form className="max-w-md mx-auto mb-6" onSubmit={(e) => e.preventDefault()}>
            <label
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
                Buscar
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-white border border-gray-600 rounded-md bg-gray-700 placeholder-gray-400"
                    placeholder="Buscar tareas..."
                    onChange={handleSearch}
                />
            </div>
        </form>
    );
};

export default Search;
