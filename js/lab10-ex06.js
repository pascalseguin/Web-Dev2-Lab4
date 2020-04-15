document.addEventListener("DOMContentLoaded", function () {
   // const utterance = new SpeechSynthesisUtterance('Hey there buddy');
   // speechSynthesis.speak(utterance);
  
   window.speechSynthesis.addEventListener('voiceschanged', function () {
    let select = document.querySelector("#voices");
    // get array of all available voices for this computer+browser
    let voices = this.getVoices();
    // filter them so only have the english voices
    let englishVoices = voices.filter( voice =>
    voice.lang.includes('en'));
    // populate the list only the first time in
    if (select.childElementCount == 1) {
    englishVoices.forEach( (voice) => {
    let opt = document.createElement("option");
    opt.setAttribute("value", voice.name)
    opt.appendChild( document.createTextNode(voice.name + ' ['
    + voice.lang + ']'));
    select.appendChild(opt);
    });

};
document.querySelector('#speak').addEventListener('click', (e) => {
    e.preventDefault();
    // get the text to say and the voice options from form
    let message = document.querySelector('textarea').value;
    let selectedVoice = document.querySelector('#voices').value;
    // create utterance and give it text to speak
    let utterance = new SpeechSynthesisUtterance(message);
    // set the speech options (voice, rate, pitch)
    utterance.voice = englishVoices.find(voice =>
    voice.name === utterance);
    utterance.rate = document.querySelector('#rate').value;
    utterance.pitch = document.querySelector('#pitch').value;
    // all ready, make it speak
    window.speechSynthesis.speak(utterance);
    });
   });

   
});