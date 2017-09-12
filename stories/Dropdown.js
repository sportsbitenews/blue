import React from 'react'
import { storiesOf } from '@storybook/react'
import { Dropdown, Link } from '../src/index.js'

const cb = () => {
  console.log('action')
}

storiesOf('Dropdown', module)
  .add('default', () => (
    <div>
      <Dropdown onOpen={cb} trigger={<Link>Link</Link>} isOpen>
        <div>
          <Link>One</Link>
        </div>
        <div>
          <Link>Two</Link>
        </div>
        <div>
          <Link>Three</Link>
        </div>
      </Dropdown>
    </div>
  ))
  .add('drop-up', () => (
    <div style={{ position: 'fixed', bottom: 0, right: 0 }}>
      <Dropdown trigger={<a href='#'>Link</a>}>
        <div>
          <Link>One</Link>
        </div>
        <div>
          <Link>Two</Link>
        </div>
        <div>
          <Link>Three</Link>
        </div>
      </Dropdown>
    </div>
  ))
  .add('popover', () => (
    <div>
      <Dropdown onOpen={cb} trigger={<Link>Link</Link>}>
        <div>
          Content
        </div>
      </Dropdown>
    </div>
  ))
