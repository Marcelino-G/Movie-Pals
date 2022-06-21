// import React from 'react';
import ReactDOM from 'react-dom/client';
import Form from './UserForm'
// import CreateUser from './CreateUser';

const root = ReactDOM.createRoot(document.getElementById('main'));

const Parent = () => {
  return <Form />
}

root.render(<Form/>)



