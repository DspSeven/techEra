import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

const langConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class LangDetails extends Component {
  state = {
    status: langConstants.loading,
    langData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({status: langConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const courseDetailsApiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(courseDetailsApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        description: data.course_details.description,
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }
      this.setState({status: langConstants.success, langData: updatedData})
    } else {
      this.setState({status: langConstants.failure})
    }
  }

  successApi = () => {
    const {langData} = this.state
    const {id, name, imageUrl, description} = langData
    return (
      <div>
        <img src={imageUrl} alt={name} />
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    )
  }

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

  loadingApi = () => {
    console.log('')
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" />
      </div>
    )
  }

  startSwitch = () => {
    const {status} = this.state
    switch (status) {
      case langConstants.success:
        return this.successApi()
      case langConstants.failure:
        return this.failureApi()
      case langConstants.loading:
        return this.loadingApi()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
          />
        </Link>
        {this.startSwitch()}
      </div>
    )
  }
}
export default LangDetails
