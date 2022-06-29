// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { createTestStore } from './app/store';
import { Provider } from 'react-redux';
import { ComponentType, ReactElement } from 'react';

global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

function customRender(ui: ReactElement, options?: RenderOptions): RenderResult {
  function AllProviders({children}: any): ReactElement {
    const store = createTestStore();
    return (
      <Provider store={store}>{children}</Provider>
    );
  }

  const view = render(ui, {
    wrapper: AllProviders as ComponentType,
    ...options
  });
  return {...view};
}

export { customRender as Render };
export * from '@testing-library/react';
