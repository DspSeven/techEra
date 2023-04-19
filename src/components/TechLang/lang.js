const TechLang = props => {
  const {details} = props
  const {id, name, logoUrl} = details
  return (
    <li to={`/courses/${id}`}>
      <img src={logoUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}
export default TechLang
