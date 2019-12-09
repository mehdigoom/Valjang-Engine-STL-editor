import * as React from "react"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/login'
class App extends React.Component {
    render() {
        return (
            <Router>

            <main className="main-wrapper">
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/">
                <Login />
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