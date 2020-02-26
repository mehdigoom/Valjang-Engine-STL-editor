function Getadmin(name){

    var myRequest = new Request("public.valjang.fr:5000/admin");
var ifadmin = false
    fetch(myRequest)

    .then(function(response) { return response.json(); })

    .then(function(data) {


        for (var i = 0; i < data.length; i++) {
            var Newdata = data[i]
            if(Newdata.name === name){
               
                ifadmin = true
            }
        }

       return(ifadmin)





    }); ////end admin
}
export default Getadmin