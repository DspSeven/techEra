import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import TechLang from '../TechLang/lang'

const techConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class TechEra extends Component {
  state = {
    status: techConstants.loading,
    techData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({status: techConstants.loading})
    const coursesApiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(coursesApiUrl, options)
    if (response.ok) {
      const dataFile = await response.json()
      const updatedData = dataFile.courses.map(data => ({
        id: data.id,
        logoUrl: data.logo_url,
        name: data.name,
      }))
      this.setState({status: techConstants.success, techData: updatedData})
    } else {
      this.setState({status: techConstants.failure})
    }
  }

  // loading
  loadingApi = () => {
    console.log('')
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" />
      </div>
    )
  }

  // success
  successApi = () => {
    const {techData} = this.state
    return (
      <ul>
        {techData.map(data => (
          <TechLang key={data.id} details={data} />
        ))}
      </ul>
    )
  }

  // failure
  failureApi = () => {
    console.log('')
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button onClick={this.getData} type="button">
          Retry
        </button>
      </div>
    )
  }

  startSwitch = () => {
    const {status} = this.state
    switch (status) {
      case techConstants.success:
        return this.successApi()
      case techConstants.failure:
        return this.failureApi()
      case techConstants.loading:
        return this.loadingApi()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
            />
          </Link>
        </div>
        <h1>Courses</h1>
        {this.startSwitch()}
      </div>
    )
  }
}
export default TechEra
