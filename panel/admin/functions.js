function Getliste() {
    return (<Async promiseFn={model}>
      {({ data, err, isLoading }) => {
        if (isLoading) return "Loading models..."
        if (err) return `Something went wrong: ${err.message}`
  
        if (data)
          return (
            <div>
              <div>
                <input class="favorite styled" type="button" name="Loginbtn" value="Ajouter un model" />
  
              </div>
              {data.map(model => (
                <div key={model.name} className="row">
                  <div className="col-md-12">
                    <h1>{model.name}</h1>
                    <img class="fit-picture" src={model.image} />
                    <br></br>
                    <input class="favorite styled" type="button" onClick={() => modifyModel(model.name)} step="1" id={model.name} value="Modifier" />
                    <input class="favorite styled" type="button" id={model.name} value="Supprimer" />
                    <input class="favorite styled" type="button" id={model.name} value="Voir dans le viwver" />
                  </div>
                </div>
              ))}
            </div>
          )
      }}
    </Async>)
  }
  //------------------------------------------------------------------------------------------------------

  const model = () =>
  fetch("http://public.valjang.fr:5000/model")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())
//---------------------------------------------------------------------------------------------------------------------
function Cinditionalrender() {
  
    console.log("conditional step : "+step)
    if (step == "L") {
      return (Getliste())
    } else if (step == "M") {
  
      return (modify(select))
  
    } else { return (<h1>Err : invalid step : {step}</h1>) }
  }
//----------------------------------------------------------------------------------------------------------------
const modifyModel = (id) => {
    console.log('model id : ', id)
    select = id
    step = "M"
    console.log('model step : ', step)
    
  };
  