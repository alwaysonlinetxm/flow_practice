Practice of Inferno & Redux with Flow
-----------------------------------

这里参照上一个[React]()项目，使用Inferno替代React实践了下。基本情况都和React相同，这里仅说明一些和React不同的情况。
从结果来看，目前Flow对Inferno的支持情况还是不太理想的，好多对React支持的特性对Inferno都不适用。

### Pay attention

- 在使用babel打包时，为了使babel能支持flow语法，需要安装babel-preset-flow，并在.babelrc中配置flow preset；
- 对`connect(mapStateToProps, mapDispatchToProps)(Root)`报错问题，Inferno中并没有出现，原因是问题来源于react-redux，而Inferno使用的是inferno-redux；

### props & state & defaultProps type check

对于[官网](https://flow.org/en/docs/frameworks/react/)列出的几种方式，Inferno仅支持下面的这种，并且支持的也不完全：

    class Root extends Component {
      props: {
        text: string,
        ...
      }

      state: {
        text: string
      }

      constructor(props) {
        super(props);
        this.state = {
          text: 'lalala' // will check type by flow
        };
      }

      updateState = () => {
        this.setState({
          text: 234 // won't check type by flow, actually， it should be a string
        });
      }
      ...
    }
    
props和state可以通过上面的方式来添加类型检查，但是state的检查也不完全，比如上述代码中updateState方法中设置了一个不符合的类型，但Flow也并没有报错。另外，defaultProps不管用何种方式(这里仅指官网提供的方式)，都无法设置有效的类型检查。
    
#### Inferno refs check type

Flow并不会检查ref是否设置了类型检查，即便设置了也会被忽略。这一点实例属性也一样。


