import React from 'react'
import { shallow } from 'enzyme'
import Text from '..'

describe('ClassName', () => {
  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = shallow(<Text className={className} />)

    expect(wrapper.prop('className')).toContain(className)
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<Text>Gator</Text>)

    expect(wrapper.text()).toBe('Gator')
  })
})

describe('Styles', () => {
  test('Has default component className', () => {
    const wrapper = shallow(<Text />)

    expect(wrapper.prop('className')).toContain('c-Text')
  })

  test('Applies sizing styles if specified', () => {
    const wrapper13 = shallow(<Text size='13' />)
    const wrapper20 = shallow(<Text size='20' />)

    expect(wrapper13.prop('className')).toContain('is-13')
    expect(wrapper20.prop('className')).toContain('is-20')
  })

  test('Applies disableSelect styles if specified', () => {
    const wrapper = shallow(<Text disableSelect />)

    expect(wrapper.prop('className')).toContain('is-disableSelect')
  })

  test('Applies muted styles if specified', () => {
    const wrapper = shallow(<Text muted />)

    expect(wrapper.prop('className')).toContain('is-muted')
  })

  test('Applies subtle styles if specified', () => {
    const wrapper = shallow(<Text subtle />)

    expect(wrapper.prop('className')).toContain('is-subtle')
  })

  test('Applies faint styles if specified', () => {
    const wrapper = shallow(<Text faint />)

    expect(wrapper.prop('className')).toContain('is-faint')
  })

  test('Applies truncation styles if specified', () => {
    const wrapper = shallow(<Text truncate />)

    expect(wrapper.prop('className')).toContain('is-truncate')
  })
})

describe('States', () => {
  test('Applies error styles if specified', () => {
    const wrapper = shallow(<Text state='error' />)

    expect(wrapper.prop('className')).toContain('is-error')
  })

  test('Applies success styles if specified', () => {
    const wrapper = shallow(<Text state='success' />)

    expect(wrapper.prop('className')).toContain('is-success')
  })

  test('Applies warning styles if specified', () => {
    const wrapper = shallow(<Text state='warning' />)

    expect(wrapper.prop('className')).toContain('is-warning')
  })
})
