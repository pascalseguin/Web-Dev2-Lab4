// before you start, view this url in the browser to see its sructure
const url = 'https://gist.githubusercontent.com/rconnolly/1d6ac7ede49e501ff0aca8a0c2a36c8c/raw/d21fadafd1c48eb3ab6d507993ebf5c6288a28c7/continents.json';

window.addEventListener('load', function() {
    
    // fetch the continents from the api in url
    fetch(url)
    .then( (response) =>
    {
        if (response.ok){
        return response.json();
        }
        else 
        {
            return Promise.reject({
                status: response.status,
                statusText: response.statusText
            })
        }
    })
    .then( (data) => { 
        for (let d of data){        
                      console.dir(d.name);
                      const s =  document.createElement("li");
                      s.textContent = d.name;
            this.document.querySelector(".box ul").appendChild(s);
        }
    })
    .catch((error) => {console.log(error);});
});