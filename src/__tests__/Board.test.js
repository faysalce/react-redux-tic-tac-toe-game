import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import Board  from '../components/Board'

test('display squares with correct value', async () => {

    render(<Board squares={['X',null,'O',null,'X','O',null,'X',null]}/>)

    const squares = screen.queryAllByTestId('square')
    expect(squares.length).toBe(9)

    expect(squares[0].textContent).toBe('X')
    expect(squares[1].textContent).toBe('')
    expect(squares[2].textContent).toBe('O')
    expect(squares[3].textContent).toBe('')
    expect(squares[4].textContent).toBe('X')
    expect(squares[5].textContent).toBe('O')
    expect(squares[6].textContent).toBe('')
    expect(squares[7].textContent).toBe('X')
    expect(squares[8].textContent).toBe('')
})

test('handles onClick event', async () => {
    const mockCallback = jest.fn((i) => {});

    render(<Board squares={['X',null,'O',null,'X','O',null,'X',null]} onClick={mockCallback} />)

    fireEvent.click(screen.getAllByTestId("square")[2])

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe(2);

    fireEvent.click(screen.getAllByTestId("square")[3])

    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.calls[1][0]).toBe(3);
})