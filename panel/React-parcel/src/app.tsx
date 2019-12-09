import * as React from "react"
import login from './components/login'
class App extends React.Component {
    render() {
        return (
    <div>
 <h1>Viewer Panel</h1>

{login}

    </div>
           

        )
    }
}

// L'export par défault de notre fichier app.tsx est la class App qui a été extends par React
// Mon app peut être désormais importé dans d'autres fichiers de mon projet
export default App;