import React from 'react';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import store from './store';
import { Comments } from '../features/comments/Comments';
import './App.css';
import 'antd/dist/antd.css';

function App() {
  const {Content} = Layout;

  return (
    <Provider store={store}>
      <Layout>
        <Content>
          <Comments/>
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;
