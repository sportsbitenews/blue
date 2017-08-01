import React from 'react'
import { mount, shallow } from 'enzyme'
import CloseButton from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<CloseButton />)

    expect(wrapper.prop('className')).toContain('c-CloseButton')
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = shallow(<CloseButton className={className} />)

    expect(wrapper.prop('className')).toContain(className)
  })
})

describe('Accessibility', () => {
  test('Has proper aria-role', () => {
    const wrapper = shallow(<CloseButton />)

    expect(wrapper.prop('aria-label')).toBe('Close')
  })

  test('Has default title', () => {
    const wrapper = shallow(<CloseButton />)

    expect(wrapper.prop('title')).toBe('Close')
  })

  test('Can modify title', () => {
    const wrapper = shallow(<CloseButton title='CLOSE DIS THING' />)

    expect(wrapper.prop('title')).toBe('CLOSE DIS THING')
  })
})

describe('Events', () => {
  test('Can trigger onBlur callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<CloseButton onBlur={spy} />)

    wrapper.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('Can trigger onClick callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<CloseButton onClick={spy} />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('Can trigger onFocus callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<CloseButton onFocus={spy} />)

    wrapper.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })
})
