import React from 'react'
import { mount } from 'enzyme'
import PopoverWrapper from '..'

const DummyComponent = props => {
  return (
    <div>
      {props.children}
    </div>
  )
}

const TestComponent = PopoverWrapper()(DummyComponent)

const cleanUp = (wrapper) => {
  wrapper.unmount()
  global.document.body.innerHTML = ''
}

test('Can create a component as a HOC', () => {
  const wrapper = mount(
    <TestComponent isOpen>
      Ron
    </TestComponent>
  )
  const c = document.body.childNodes[0]

  expect(c.innerHTML).toContain('Ron')

  cleanUp(wrapper)
})

// describe('Focus', () => {
//   test('Can create a component as a HOC', (done) => {
//     const spy = jest.fn()

//     const wrapper = mount(
//       <TestComponent isOpen trigger={<a href='#'>Trigger</a>}>
//         <a href='#' onFocus={spy}>Link 1</a>
//         <a href='#' onFocus={spy}>Link 2</a>
//         <a href='#' onFocus={spy}>Link 3</a>
//       </TestComponent>
//     )

//     setTimeout(() => {
//       expect(spy).toHaveBeenCalled()

//       cleanUp(wrapper)
//       done()
//     }, 100)
//   })
// })
