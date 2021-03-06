import React from 'react'
import { mount, shallow } from 'enzyme'
import Sortable from '..'
import SortableItem from '../Item'
import SidebarCollapsibleCard from '../../SidebarCollapsibleCard'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Sortable />)

    expect(wrapper.hasClass('c-Sortable')).toBeTruthy()
    wrapper.unmount()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Sortable className={customClass} />)

    expect(wrapper.hasClass(customClass)).toBeTruthy()
    wrapper.unmount()
  })
})

describe('Children', () => {
  test('Can render without children', () => {
    const wrapper = shallow(<Sortable />)

    expect(wrapper.state().items.length).toBe(0)
  })

  test('Remaps children to state as SortableItem components', () => {
    const wrapper = mount(
      <Sortable>
        <div>Ron</div>
        <div>Champ</div>
        <div>Brick</div>
      </Sortable>
    )
    const o = wrapper.state().items[0]

    expect(wrapper.state().items.length).toBe(3)

    expect(o.type.displayName).toBe('sortableElement')
    expect(o.key).toBeTruthy()

    wrapper.unmount()
  })
})

describe('DragHandles', () => {
  test('Adds DragHandles if useDragHandle is true', () => {
    const wrapper = mount(
      <Sortable useDragHandle>
        <div>Ron</div>
        <div>Champ</div>
        <div>Brick</div>
      </Sortable>
    )
    const o = wrapper.find('.c-SortableDragHandle')

    expect(o.length).toBe(3)
    wrapper.unmount()
  })

  test('Does not show DragHandle by default', () => {
    const wrapper = mount(
      <Sortable>
        <div>Ron</div>
        <div>Champ</div>
        <div>Brick</div>
      </Sortable>
    )
    const o = wrapper.find('.c-SortableDragHandle')

    expect(o.length).toBe(0)

    wrapper.unmount()
  })

  test('Hides DragHandles if specified', () => {
    const wrapper = mount(
      <Sortable useDragHandle hideDragHandles>
        <div>Ron</div>
        <div>Champ</div>
        <div>Brick</div>
      </Sortable>
    )
    const o = wrapper.find('.c-SortableDragHandle')

    expect(o.length).toBe(0)

    wrapper.unmount()
  })
})

describe('Item', () => {
  test('Can render SortableItem components', () => {
    const wrapper = mount(
      <Sortable>
        <SortableItem>Ron</SortableItem>
        <SortableItem>Champ</SortableItem>
        <SortableItem>Brick</SortableItem>
      </Sortable>
    )
    const o = wrapper.state().items

    expect(o.length).toBe(3)

    wrapper.unmount()
  })

  test('Can render SortableItem components + regular compnents', () => {
    const wrapper = mount(
      <Sortable>
        <SortableItem>Ron</SortableItem>
        <SortableItem>Champ</SortableItem>
        <div>Brian</div>
        <SortableItem>Brick</SortableItem>
      </Sortable>
    )
    const o = wrapper.state().items

    expect(o.length).toBe(4)

    wrapper.unmount()
  })

  test('Passes a sortable prop to child components if they support it', () => {
    const wrapper = mount(
      <Sortable>
        <SidebarCollapsibleCard>Ron</SidebarCollapsibleCard>
        <SortableItem>Champ</SortableItem>
        <SortableItem>Brick</SortableItem>
      </Sortable>
    )
    const o = wrapper.find(SidebarCollapsibleCard)

    expect(o.props().sortable).toBeTruthy()

    wrapper.unmount()
  })
})

describe('Stateful parent component', () => {
  class ParentComponent extends React.Component {
    constructor (props) {
      super()
      this.state = {
        items: props.items ? props.items : []
      }
      this.handleOnSort = this.handleOnSort.bind(this)
    }

    handleOnSort () {
      this.setState({ items: this.state.items.concat('Brian') })
    }

    render () {
      const items = this.state.items.map(i => (
        <div key={i}>{i}</div>
      ))

      return (
        <Sortable onSortEnd={this.handleOnSort}>
          {items}
        </Sortable>
      )
    }
  }

  class ParentComponentTwo extends React.Component {
    constructor (props) {
      super()
      this.state = {
        value: 0,
        items: props.items ? props.items : []
      }
      this.handleOnSort = this.handleOnSort.bind(this)
    }

    handleOnSort () {
      this.setState({
        value: this.state.value + 1
      })
    }

    render () {
      const {
        className
      } = this.props
      const items = this.state.items.map(i => (
        <div key={i}>{i}</div>
      ))

      return (
        <Sortable onSortEnd={this.handleOnSort} className={className}>
          {items}
        </Sortable>
      )
    }
  }

  test('Should re-render items stateful change via onSortEnd', () => {
    const items = ['Ron', 'Brick', 'Champ']
    const wrapper = mount(<ParentComponent items={items} />)
    const o = wrapper.find(Sortable)
    const oldState = o.node.state

    expect(wrapper.find('.c-SortableItem').length).toBe(3)
    o.props().onSortEnd()
    expect(wrapper.find('.c-SortableItem').length).toBe(4)
    o.props().onSortEnd()
    expect(wrapper.find('.c-SortableItem').length).toBe(5)

    expect(oldState.items).not.toEqual(o.node.state.items)

    wrapper.unmount()
  })

  test('Should only re-render Sortable if children prop is updated', () => {
    const items = ['Ron', 'Brick', 'Champ']
    const wrapper = mount(<ParentComponentTwo items={items} />)
    const o = wrapper.find(Sortable)
    const oldWrapperState = wrapper.state()
    const oldState = o.node.state

    expect(wrapper.find('.c-SortableItem').length).toBe(3)
    o.props().onSortEnd()
    expect(wrapper.find('.c-SortableItem').length).toBe(3)
    o.props().onSortEnd()
    expect(wrapper.find('.c-SortableItem').length).toBe(3)

    wrapper.setProps({ className: 'news-team' })

    expect(oldWrapperState).not.toEqual(wrapper.state())
    expect(oldState.items).toEqual(o.node.state.items)

    wrapper.unmount()
  })
})
