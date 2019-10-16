import React from 'react';

import useReadModel from '../hooks/useReadModel'

export default () => {
  const res = useReadModel('counterReadModel', 'counterValue')
  console.log('result', res)

  return (
    <div>
      <div>Hello, world!</div>
      <button onClick={() => alert('Hey!')}>Click me</button>
    </div>
  )
}
