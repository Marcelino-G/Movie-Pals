// import React from 'react';
import ReactDOM from 'react-dom/client';
import Child from './App';

const root = ReactDOM.createRoot(document.getElementById('main'));

const Parent = () => {
  return <Child />
}

root.render(<Child/>)



