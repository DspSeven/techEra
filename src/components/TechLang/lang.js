import {Link} from 'react-router-dom'

const TechLang = props => {
  const {details} = props
  const {id, name, logoUrl} = details
  return (
    <li>
      <Link to={`/courses/${id}`}>
        <img src={logoUrl} alt={name} />
        <p>{name}</p>
      </Link>
    </li>
  )
}
export default TechLang
