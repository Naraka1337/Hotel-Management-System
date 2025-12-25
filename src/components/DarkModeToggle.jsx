import { useThemeContext } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
    const { mode, toggleColorMode } = useThemeContext();

    return (
        <button
            onClick={toggleColorMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle Dark Mode"
        >
            {mode === 'light' ? (
                <Moon className="w-5 h-5 text-gray-800" />
            ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
            )}
        </button>
    );
};

export default DarkModeToggle;
