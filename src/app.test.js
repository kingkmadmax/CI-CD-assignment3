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



});