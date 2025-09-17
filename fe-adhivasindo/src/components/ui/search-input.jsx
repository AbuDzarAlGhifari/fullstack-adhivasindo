import React from 'react';
import { Search } from 'lucide-react';

const SearchInput = ({
    placeholder = 'Search...',
    value,
    onChange,
    className = '',
}) => {
    return (
        <div
            className={`flex items-center w-full max-w-md rounded-lg border px-3 py-2 bg-white shadow-sm ${className}`}
        >
            <Search className="w-5 h-5 text-gray-400" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="ml-2 w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
        </div>
    );
};

export default SearchInput;
