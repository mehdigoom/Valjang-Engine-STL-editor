import * as React from "react"

class App extends React.Component {
    render() {
        return (
            <h1>Bonjour je suis un titre</h1>
        )
    }
}

// L'export par défault de notre fichier app.tsx est la class App qui a été extends par React
// Mon app peut être désormais importé dans d'autres fichiers de mon projet
export default App;