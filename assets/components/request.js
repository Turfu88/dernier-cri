
export default async function request(url, method = "GET"){
    let myHeaders = new Headers()
    myHeaders.append("Content-type", "application/json")
  
    let requestOptions = {
        method: method,
        headers: myHeaders,
    }

    let status, json
    json = await fetch(url, requestOptions)
        .then(response =>{
            // console.log('response : ', response)
            status = response.status
            return response.text()
        })
        .then(result => {
            // console.log("result : ", result)
            if(result)return JSON.parse(result)
            return
        })
        .catch(result => 
            console.log(result)
        );


    return {status, json}
}
