import * as React from "react"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Login} from './components/login'
import {Register} from './components/register'
import {Panel} from './components/panel'
class App extends React.Component {
    render() {
        return (
            <Router>

            <main >
              <Switch>
                
              
                
                
              <Route exact title="home-login" path="/">
              <Login />
            </Route>
               
               
               
                <Route path="/panel/">
                <Panel />
                </Route>

              
              
                <Route path="/register/">
                <Register />
                </Route>

              </Switch>
            </main>
          </Router>
           

        )
       
    }
}

// L'export par défault de notre fichier app.tsx est la class App qui a été extends par React
// Mon app peut être désormais importé dans d'autres fichiers de mon projet
export default App;