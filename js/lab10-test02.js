
document.addEventListener("DOMContentLoaded", function() { 
    var map;



const bbox = document.querySelector("#galleryList");
const abox = document.querySelector(".box a");
const cboxList = document.querySelector("#paintingList");
const dbox = document.querySelector("div.box.d");


    

    const endpoint = 'https://gist.githubusercontent.com/rconnolly/a0ad7768d65b6fa46f4e007a1cf27193/raw/38696e5b84cd6b66667a6b87c66c058ab2606ba2/galleries.json';
    const mueseums = [];

    fetch(endpoint)
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
        mueseums.push(...data);
        printMList()
        console.log(data);
          }
        )

    .catch((error) => {console.log(error);})

    
    function printMList(){
    for (let m of mueseums){
    let temp = document.createElement("li");
    temp.textContent = m.nameEn
    bbox.appendChild(temp);
    }
    document.querySelector("div.b section").style.display =  "block";
    }

    bbox.addEventListener("click", (e) => {

        console.log(e.target.textContent);

      if (e.target && e.target.nodeName.toLowerCase() == "li")
      {
        let object = mueseums.find(o => o.nameEn === e.target.textContent);
          document.getElementById("galleryName").textContent = e.target.textContent;
          document.getElementById("galleryNative").textContent = object.nameNative;
          document.getElementById("galleryCity").textContent = object.location.city;
          document.getElementById("galleryAddress").textContent = object.location.address;
          document.getElementById("galleryCountry").textContent = object.location.country;
          document.getElementById("galleryHome").textContent = object.link;
          document.getElementById("galleryHome").setAttribute("href", object.link);
          document.querySelector("div.a section").style.display =  "grid";


          dbox.style.display = "block";
          dbox.style.height = "700px";
          initMap(object.location.latitude, object.location.longitude);
          object.paintings.forEach(p => {
             let temp = document.createElement("li");
             temp.textContent = p.title;
             temp.addEventListener('click', e => {
                if  (e.target && e.target.nodeName.toLowerCase() == "li")
                {
                    const speaking = new SpeechSynthesisUtterance(p.description);
                    speechSynthesis.speak(speaking);
                    console.log("Hello");
                }
             })
                cboxList.appendChild(temp);
          });
          cboxList.style.listStyleType = "none";
          document.querySelector("div.c section").style.display = "block";


      }

    }); 
    function initMap(lati,longi) {
        console.log(longi, lati);
        map = new google.maps.Map(dbox, 
                                {center: {lat: lati, lng: longi},
                                mapTypeId: 'satellite',
                                zoom: 18
                                });
    }

});