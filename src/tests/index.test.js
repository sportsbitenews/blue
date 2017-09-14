import {
  Animate,
  Avatar,
  AvatarStack,
  Badge,
  Button,
  Card,
  Checkbox,
  Choice,
  ChoiceGroup,
  CloseButton,
  Collapsible,
  EventListener,
  Flexy,
  FormGroup,
  Grid,
  Heading,
  Icon,
  Image,
  Input,
  KeypressListener,
  Label,
  Link,
  LoadingDots,
  Overlay,
  Portal,
  PortalWrapper,
  ProgressBar,
  Radio,
  RouteWrapper,
  Select,
  Scrollable,
  SidebarCollapsibleCard,
  Text,
  VisuallyHidden
} from '..'

const components = [
  Animate,
  Avatar,
  AvatarStack,
  Badge,
  Button,
  Card,
  Checkbox,
  Choice,
  ChoiceGroup,
  CloseButton,
  Collapsible,
  EventListener,
  Flexy,
  FormGroup,
  Grid,
  Heading,
  Icon,
  Image,
  Input,
  KeypressListener,
  Label,
  Link,
  LoadingDots,
  Overlay,
  Portal,
  PortalWrapper,
  ProgressBar,
  RouteWrapper,
  Radio,
  Scrollable,
  Select,
  SidebarCollapsibleCard,
  Text,
  VisuallyHidden
]

const componentTestHelper = (component) => {
  test(component.name, () => {
    expect(component).toBeTruthy()
    expect(typeof component).toBe('function')
  })
}

components.forEach(c => componentTestHelper(c))
