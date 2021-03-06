Practice of React & Redux with Flow
-----------------------------------

实践了下在React & Redux的项目代码中Flow的应用。

### Pay attention

1. Flow做的是编译时检查，所有检查都是基于当前代码中对已声明类型的变量的使用，所有运行时的变更都不在检查范围之内；
2. css/sass等文件的使用需要在.flowconfig中配置option的module.name_mapper.extension，具体设置参照代码示例；
3. 示例代码中还使用了[flow-typed](https://github.com/flowtype/flow-typed)来做对第三方模块的type check；
4. 由于React Preset已经包含了`syntax-flow`和`transform-flow-strip-types`，所以使用babel进行打包编译时，无需配置额外的内容；

### React with Flow

事先声明两个概念：
- 可选检查：可以设置类型检查，不设置类型检查Flow也不会报错；
- 强检查：必须设置类型检查，不设置类型检查Flow会报错；

#### props & state & defaultProps type check

可选检查，Flow对React的支持比较完善，凡是[官网文档](https://flow.org/en/docs/frameworks/react/)上列出的几种check方式，都得到了支持。
这里采用如下这种方式：

    type DefaultProps = {
      text: string,
      ...
    };

    type Props = {
      text: string,
      ...
    };

    type State = {
      text: string
    };

    class Root extends PureComponent<DefaultProps, Props, State> {
      ...
    }
    
在设置检查的情况下，有未设置类型的props和state属相，会得到报错，但defaultProps不会。    
需要注意的是，Flow做的是编译时检查，即仅仅检查当前代码中各种值类型的使用(例如，组件本身props，state的使用，会根据props，state的类型进行验证；父组件向子组件传值，会根据子组件props类型进行验证)，所以后续运行时做的相关值的变更(比如在redux中state改变了，从而到了新的props)是不会得到检查的。

#### React event type check

可选检查，检查方式如下：

    setText = (event: Event & { currentTarget: HTMLDivElement }) => {
      ...
    }
    
#### React refs check type

强检查，这一点和实例属性相同，检查方式如下：

    test: HTMLParagraphElement
    ...
    render() {
      return <div ref={ref => this.test = ref}>list: </div>;
    }
    
#### React lifecycle methods check type

可选检查，检查方式如下：

    componentDidUpdate(prevProps: Props, prevState: State) {
      ...
    }
    
#### React functional components check type

强检查，检查方式如下：

    export default function Text(props: { text: string }) {
      return <p>Text: {props.text}</p>
    }

### Redux with Flow

Flow在Redux中主要对state，action，reducer进行检查。

#### state type check

可选检查，主要在设置reducer中initState用到，在属性前添加'+'，标记这是一个immutable的属性，检查方式如下：

    type State = {
      +text: string,
      ...
    };

    const initState: State = {
      text: 'init common',
      ...
    };

#### action type check

强检查，但return是可选检查，检查方式如下：

    function setText(text: string): SetText {
      return { type: "SET_TEXT", text };
    }
    
在特殊场景下，可能需要使用到union action type：

    type SetText = { type: "SET_TEXT", text: string };
    type GetList = { type: "GET_LIST" };

    type Action = SetText | GetList;
    
具体使用场景在reducer一块会提到。
    
    
#### reducer type check
 
强检查，但return是可选检查，不添加empty type也不会报错(不知道作用在哪)，检查方式如下：
 
    type State = {
      +text: string,
      ...
    };

    const initState: State = {
      text: 'init common',
      ...
    };

    export default function common(state: State = initState, action: Action): State {
      switch (action.type) {
        case "SET_TEXT": return { ...state, text: action.text };
        ...
        default:
          (action: empty);
          return state;
      }
    }
  
有个问题是，作为reducer，能接收到的action是有多个的，而每个action的type其实都是不一样的，那么如何设置action参数的类型呢？
可以看到这里对于action参数的类型检查给了一个Action类型，这个Action类型正式上文提到的union action，正好解决了action参数多类型的情况。

### Unresolved problems

1. 安装了flow-type之后，对`connect(mapStateToProps, mapDispatchToProps)(Root)`产生了报错，原因未知，参见(https://github.com/flowtype/flow-typed/issues/778).现解决办法是把那行通过suppress_comment注释掉了。
    
    
    


