import {Switch, Route} from 'react-router-dom'
import TechEra from './components/TechEra/tech'
import LangDetails from './components/LangDetails/lang'
import './App.css'

const App = () => {
  console.log('')
  return (
    <Switch>
      <Route exact path="/" component={TechEra} />
      <Route exact path="/courses/:id" component={LangDetails} />
    </Switch>
  )
}
export default App
