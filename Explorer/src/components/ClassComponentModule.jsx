import { Component } from "react"


class ClassComponentModule extends Component {
  constructor (props) {
    super(props)
    this.state = { clicks: 0 }
    console.log('Class Comp: Constructor')
  }

  componentDidMount () {
    console.log('Class Comp: DidMount')
  }

  componentDidUpdate () {
    console.log('Class Comp: DidUpdate')
  }

  handleClick = () => {
    console.log('Class Comp: Click Event')
    this.setState({ clicks: this.state.clicks + 1 })
  }

  render () {
    return (
      <div className='p-6 bg-white rounded-xl shadow-sm border border-slate-200'>
        <div className='flex items-center justify-between'>
          <p className='text-slate-700'>Legacy Class Component</p>
          <button
            onClick={this.handleClick}
            className='bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer'
          >
            Clicked: {this.state.clicks}
          </button>
        </div>
      </div>
    )
  }
}

export default ClassComponentModule;