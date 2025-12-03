import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterForm } from '../components/Auth/RegisterForm';
import { vi, describe, it, expect } from 'vitest';
import * as authApi from '../api/auth';

// Mock the api module
vi.mock('../api/auth', () => ({
    register: vi.fn(),
}));

// Mock react-toastify
vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe('RegisterForm', () => {
    it('renders correctly', () => {
        render(<RegisterForm setAuthView={vi.fn()} />);
        expect(screen.getByRole('heading', { name: 'Create Account' })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('John')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Doe')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    });

    it('allows role selection', () => {
        render(<RegisterForm setAuthView={vi.fn()} />);
        const roleSelect = screen.getByRole('combobox');
        expect(roleSelect).toBeInTheDocument();
        expect(roleSelect.value).toBe('guest');

        fireEvent.change(roleSelect, { target: { value: 'manager' } });
        expect(roleSelect.value).toBe('manager');
    });

    it('submits form with correct data', async () => {
        const mockRegister = authApi.register;
        mockRegister.mockResolvedValue({ id: 1, email: 'test@test.com', role: 'manager' });
        const setAuthView = vi.fn();

        render(<RegisterForm setAuthView={setAuthView} />);

        fireEvent.change(screen.getByPlaceholderText('John'), { target: { value: 'Test' } });
        fireEvent.change(screen.getByPlaceholderText('Doe'), { target: { value: 'User' } });
        fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'test@test.com' } });
        const passwordInputs = screen.getAllByPlaceholderText('••••••••');
        fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
        fireEvent.change(passwordInputs[1], { target: { value: 'password123' } });

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'manager' } });

        fireEvent.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith({
                firstName: 'Test',
                lastName: 'User',
                email: 'test@test.com',
                password: 'password123',
                confirmPassword: 'password123',
                role: 'manager'
            });
            expect(setAuthView).toHaveBeenCalledWith('login');
        });
    });
});
