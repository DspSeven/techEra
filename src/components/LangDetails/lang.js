import {Component} from 'react'

class LangDetails extends Component {
  componentDidMount() {
    this.getData()
  }

  getData = () => {}

  render() {
    console.log('Hello World')
    return (
      <div>
        <h1>hi</h1>
      </div>
    )
  }
}
export default LangDetails
