import React from 'react';

import useReadModel from '../hooks/useReadModel'
import useViewModel from '../hooks/useViewModel';

export default () => {
  const rmRes = useReadModel('counterReadModel', 'counterValue')
  const vmRes = useViewModel('counterViewModel', 'ROOT_ID')
  console.log('read model data', rmRes)
  console.log('view model data', vmRes)

  return (
    <div>
      <div>Hello, world!</div>
      <button onClick={() => alert('Hey!')}>Click me</button>
    </div>
  )
}
