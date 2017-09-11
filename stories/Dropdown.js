import React from 'react'
import { storiesOf } from '@storybook/react'
import { Dropdown } from '../src/index.js'

storiesOf('Dropdown', module)
  .add('default', () => (
    <div>
      <Dropdown trigger={<a href='#'>Link</a>}>
        <div>
          Content
        </div>
      </Dropdown>
    </div>
  ))
  .add('drop-up', () => (
    <div style={{ position: 'fixed', bottom: 0, right: 0 }}>
      <Dropdown trigger={<a href='#'>Link</a>}>
        <div>
          Content
        </div>
      </Dropdown>
    </div>
  ))
