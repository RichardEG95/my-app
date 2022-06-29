import React from 'react';
import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Comments } from '../Comments';
import { Render } from '../../../setupTests';

const mockedComment = {
  id: 1,
  email: 'parent@email.com',
  comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  parentId: null,
};

const mockedCommentList = [
  {
    ...mockedComment,
    comments: [
      {
        id: 2,
        email: 'child@email.com',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        parentId: 1
      }
    ]
  }
];

const handlers = [
  rest.get('http://localhost:5000/api/comments', (req, res, context) => {
    return res(context.json(mockedCommentList));
  }),
  rest.delete('http://localhost:5000/api/comments/:commentId', (req, res, context) => {
    return res(context.json(1));
  }),
];

describe('Comments', () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close());

  test('Renders the form and a comment with a child comment', async () => {
    Render(<Comments/>);

    const emailElement = screen.getByText(/Email/i);
    expect(emailElement).toBeInTheDocument();

    const commentElement = screen.getByText(/Comment/i);
    expect(commentElement).toBeInTheDocument();

    const submitElement = screen.getByText(/Submit/i);
    expect(submitElement).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/parent@email.com/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/child@email.com/i)).toBeInTheDocument();
  });

  test('Deletes a comment', async () => {
    server.use(
      rest.get('http://localhost:5000/api/comments', (req, res, context) => {
        return res.once(context.json([mockedComment]));
      }),
    );

    Render(<Comments/>);

    await waitFor(() => {
      expect(screen.getByText(/parent@email.com/i)).toBeInTheDocument();
    });

    server.use(
      rest.get('http://localhost:5000/api/comments', (req, res, context) => {
        return res.once(context.json([]));
      })
    );

    fireEvent.click(screen.getByText(/Delete/i));

    await waitForElementToBeRemoved(() => screen.queryByText(/parent@email.com/i));
  });

  test('Creates a new comment', () => {});

  test('Edits a comment', () => {});
});
