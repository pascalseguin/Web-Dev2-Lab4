document.addEventListener("DOMContentLoaded", function() { 
    fetch('https://api.github.com/orgs/funwebdev-2nd-ed/repos')
    .then(function (response)
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
    .then(function (data)
    {console.dir(data);})
    .catch(function (error)
    {console.log(error);});
    
});