import React from 'react'
import { storiesOf } from '@storybook/react'
import { Popover, Link } from '../src/index.js'

storiesOf('Popover', module)
  .add('default', () => (
    <div>
      <Popover trigger={<Link>Link</Link>} triggerOn='hover'>
        Content
      </Popover>
    </div>
  ))
