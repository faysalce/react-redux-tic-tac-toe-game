import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import Square  from '../components/Square'

test('display square with value', async () => {

    render(<Square value="abc" />)

   // screen.debug(screen.queryByText("abc"))

    expect(screen.queryByTestId("square")).not.toBeNull();

    expect(screen.getByTestId("square").textContent).toBe("abc")
})

test('verify onClick even', async () => {
    const mockCallback = jest.fn(() => {});

    render(<Square onClick={mockCallback} />)

    fireEvent.click(screen.getByTestId("square"))

    expect(mockCallback.mock.calls.length).toBe(1);
})