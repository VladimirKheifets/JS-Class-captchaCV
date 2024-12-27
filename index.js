window.addEventListener("load", () => {
  //-------------------------------------------------------
  fetch("dictionary.json")
  .then(response => response.json())
  .then((data) => {
  url = new URL(window.location.href);
  var la = url.searchParams.get("la");
  if(!la) la = "en";
  if(data.dictionary[la])
    dS = data.dictionary[la];
  else
    dS = data.dictionary["en"];
  //-------------------------------------------------------
  let myCaptha = new captchaCV("captcha", dS["placeH"]);
  document.forms[0].addEventListener('submit', function(e){
    e.preventDefault();
    err = myCaptha.verification();
    alert(`${dS["msg0"]} ${dS["msg"][err]}!`);
   });
  });
});