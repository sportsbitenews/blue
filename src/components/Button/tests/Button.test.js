import React from 'react'
import { mount, shallow } from 'enzyme'
import Button from '..'

// Since we now wrap Link in a HOC, we have to use `.first.shallow()` to test.
// See https://github.com/airbnb/enzyme/issues/539#issuecomment-239497107
const wrap = (...args) => shallow(...args).first().shallow()

describe('ClassNames', () => {
  test('Accepts custom className', () => {
    const wrapper = wrap(<Button className='foo bar baz'>Click Me</Button>)
    const classNames = wrapper.prop('className')

    expect(classNames).toContain('c-button')
    expect(classNames).toContain('foo')
    expect(classNames).toContain('bar')
    expect(classNames).toContain('baz')
  })
})

describe('Types', () => {
  test('Adds the respective classNames', () => {
    const primary = wrap(<Button primary>Primary</Button>)
    const plain = wrap(<Button plain>Plain</Button>)

    expect(primary.prop('className')).toContain('c-button--primary')
    expect(plain.prop('className')).toContain('c-button--link')
  })

  test('Creates a button with type="submit"', () => {
    const button = wrap(<Button submit>Submit</Button>)

    expect(button.prop('type')).toBe('submit')
  })
})

describe('Sizes', () => {
  test('Adds the respective classNames', () => {
    const lg = wrap(<Button size='lg'>Large</Button>)
    const md = wrap(<Button size='md'>Medium</Button>)
    const sm = wrap(<Button size='sm'>Small</Button>)

    expect(lg.prop('className')).toContain('c-button--lg')
    expect(md.prop('className')).toContain('c-button--md')
    expect(sm.prop('className')).toContain('c-button--sm')
  })
})

describe('States', () => {
  test('Adds the respective classNames', () => {
    const success = wrap(<Button state='success'>Success</Button>)
    const error = wrap(<Button state='error'>Error</Button>)
    const warning = wrap(<Button state='warning'>Warning</Button>)

    expect(success.prop('className')).toContain('is-success')
    expect(error.prop('className')).toContain('is-error')
    expect(warning.prop('className')).toContain('is-warning')
  })

  test('Disables the button', () => {
    const callback = jest.fn()
    const disabledButton = mount(<Button disabled onClick={callback}>Disabled</Button>)
    disabledButton.simulate('click')

    expect(disabledButton.prop('disabled')).toBe(true)
    expect(callback).not.toBeCalled()
  })
})

describe('RouteWrapper', () => {
  let options
  let push
  let history
  let preventDefault
  let clickEvent

  beforeEach(() => {
    push = jest.fn()
    history = { push }
    options = {
      context: {
        router: { history }
      }
    }
    preventDefault = jest.fn()
    clickEvent = { preventDefault }
  })

  test('Specifying a `to` sets up router navigation, overrides default click', done => {
    const route = '/some/route/'
    const wrapper = wrap(<Button to={route}>Gator</Button>, options)
    wrapper.simulate('click', clickEvent)
    expect(preventDefault).toHaveBeenCalled()
    setTimeout(() => {
      expect(push).toHaveBeenCalledWith(route)
      done()
    })
  })

  test('`to` router navigation is skipped on ctrl+click', done => {
    const route = '/some/route/'
    const wrapper = wrap(<Button to={route}>Gator</Button>, options)
    expect(wrapper.node.type).toBe('button')
    clickEvent.ctrlKey = true
    wrapper.simulate('click', clickEvent)
    expect(preventDefault).not.toHaveBeenCalled()
    setTimeout(() => {
      expect(push).not.toHaveBeenCalled()
      done()
    })
  })

  test('`to` router navigation is skipped on cmd+click', done => {
    const route = '/some/route/'
    const wrapper = wrap(<Button to={route}>Gator</Button>, options)
    expect(wrapper.node.type).toBe('button')
    clickEvent.metaKey = true
    wrapper.simulate('click', clickEvent)
    expect(preventDefault).not.toHaveBeenCalled()
    setTimeout(() => {
      expect(push).not.toHaveBeenCalled()
      done()
    })
  })

  test('Can fetch data and trigger a route asynchronously', done => {
    const fetch = () => Promise.resolve()
    const to = 'some/route'
    const wrapper = wrap(<Button fetch={fetch} to={to} >Gator</Button>, options)
    expect(wrapper.node.type).toBe('button')
    wrapper.simulate('click', clickEvent)
    expect(preventDefault).toHaveBeenCalled()
    setTimeout(() => {
      expect(push).toHaveBeenCalledWith(to)
      done()
    })
  })
})
