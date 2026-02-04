import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
    value: {
        randomUUID: () => Math.random().toString(36).substring(7)
    }
});

// Mock localStorage
const localStorageMock = (function () {
    let store = {};
    return {
        getItem: function (key) {
            return store[key] || null;
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

describe('App Component', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    test('renders the header', () => {
        render(<App />);
        const headerElement = screen.getByText(/Notes/i, { selector: 'h1' });
        expect(headerElement).toBeInTheDocument();
    });

    test('shows empty state message when no notes exist', () => {
        render(<App />);
        const emptyMessage = screen.getByText(/Notes you add appear here/i);
        expect(emptyMessage).toBeInTheDocument();
    });

    test('adds a new note', () => {
        render(<App />);

        // 1. Expand the input area
        const bodyInput = screen.getByPlaceholderText(/Take a note/i);
        fireEvent.click(bodyInput);

        // 2. Fill in details (Title input only appears after expansion)
        const titleInput = screen.getByPlaceholderText(/Title/i);
        fireEvent.change(titleInput, { target: { value: 'Test Note Title' } });
        fireEvent.change(bodyInput, { target: { value: 'Test Note Content' } });

        // 3. Submit (Button says "Close" but is type="submit")
        const addButton = screen.getByText(/Close/i);
        fireEvent.click(addButton);

        // 4. Verify note appears
        expect(screen.getByText('Test Note Title')).toBeInTheDocument();
        expect(screen.getByText('Test Note Content')).toBeInTheDocument();
    });

    test('deletes a note', () => {
        render(<App />);

        // Add a note first
        const bodyInput = screen.getByPlaceholderText(/Take a note/i);
        fireEvent.click(bodyInput);

        const titleInput = screen.getByPlaceholderText(/Title/i);
        fireEvent.change(titleInput, { target: { value: 'Note to Delete' } });
        fireEvent.change(bodyInput, { target: { value: 'Content to Delete' } });

        const addButton = screen.getByText(/Close/i);
        fireEvent.click(addButton);

        // Verify it exists
        expect(screen.getByText('Note to Delete')).toBeInTheDocument();

        // Find delete button by title
        const deleteButton = screen.getByTitle('Delete note');
        fireEvent.click(deleteButton);

        // Verify it is gone
        expect(screen.queryByText('Note to Delete')).not.toBeInTheDocument();
    });
});