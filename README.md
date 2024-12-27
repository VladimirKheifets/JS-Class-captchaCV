
# JS Class captchaCV

### Version: 1.0, 2024-12-20

Author: Vladimir Kheifets <vladimir.kheifets.@online.de>

Copyright &copy; 2024 Vladimir Kheifets All Rights Reserved

I used the method of generating the image of the captcha code, published on codepen here
[https://codepen.io/guanqi/pen/mdbXQOJ](https://codepen.io/guanqi/pen/mdbXQOJ)
I express my heartfelt gratitude to the author.

The captchaCV class provides the creation of captcha and verification of the entered captcha code.

Demo:

[https://www.alto-booking.com/developer/captchaCV](https://www.alto-booking.com/developer/captchaCV)

[https://www.alto-booking.com/developer/captchaCV//?la=de](https://www.alto-booking.com/developer/captchaCV/?la=de)

[https://www.alto-booking.com/developer/captchaCV/?la=ru](https://www.alto-booking.com/developer/captchaCV/?la=ru)



### Creating a captchaCV object.
```js
myCaptha = new captchaCV(container_id, placeholder_inp, nChars, captchaWidth, captchaHeight);
```
### Properties:

**container_id** (string) - id DOM-элемента, контейнера, в котором должна быть созданы элементы captcha

**placeholder_inp** (string|null) - значение атрибута placeholder элемента input,
в который должен вводится captcha-код. По умолчанию: "please enter verification code"

**nChars** (integer|null) - количество символов в captcha. По умолчанию: 6

**captchaWidth** (integer|null) - длина изображения captcha в px. По умолчанию: 150

**captchaHeight** (integer|null) - длина изображения captcha в px. По умолчанию: 30

### Methods:

The **create method** - provides generation of the captcha code and image in the canvas element.

The **verification method** - provides verification of the entered captcha code and returns an error code (integer):

0 - the captcha code is entered correctly

1 - the captcha code is not entered

2 - the captcha code does not match

### Creating a captcha.

The captchaCV object is created in the parent DOM element (captcha container)
three child div elements, in each of which creates one child element:
canvas, span and input.
For example, for the container id "captcha" an HTML code will be created:
```html
<div id="captcha">
  <div>
    <canvas width="150" height="30"></canvas>
  </div>
  <div>
    <span></span>
  </div>
  <div>
    <input placeholder="please enter code">
  </div>
</div>
```
Then the create method is called and for the span element (with the 🗘 symbol - refresh)
a "click" event handler is registered, in which the create method is also called.

## Using the captchaCV class

## index.html

```html
<html>
<head>
<link rel="stylesheet" href="captchaCV.css">
<script src="captchaCV.min.js"></script>
<script src="index.js"></script>
</head>
<body>
<form>
<div id="captcha"></div>
<br>
<button type="submit">Senden</button>
</form>
</body>
</html>
```

## captchaCV.css

```css
#captcha{
  display:table;
}

#captcha div{
  display:table-cell;
  vertical-align:middle;
  text-align:center;
  min-width:30px;
}

#captcha span{
  font-size: 25px;
  cursor:pointer;
  transform: rotate(0);
  margin: 0 0 0 0;
  position: relative;
  display:inline-block;
  line-height:30px;
 }

#captcha span::before
{
  content:"\1F5D8";
}

#captcha span:hover{
   animation: rotate 2s linear infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(720deg);
  }
}

#captcha canvas{
  border: 1px solid #cccccc;
}

#captcha input{
  height: 30px;
  width: 200px;
}
```


## A simple example index.js

```js
window.addEventListener("load", () => {
  let myCaptha = new captchaCV("captcha");
  document.forms[0].addEventListener('submit', function(e){
    e.preventDefault();
    alert(myCaptha.verification());
   });
});
```


## Example multilingual version index.js

## index.js
```js
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
```

## dictionary.json

```json
{
  "dictionary":
  {
    "en":{
    "msg0":"Code",
    "msg":["is correct","must be filled","error"],
    "placeH":"please enter code"
    },

    "de":{
    "msg0":"Der Code",
    "msg":["ist korrekt","muss im Feld enthalten sein","ist falsch"],
    "placeH":"Bitte geben Sie den Code ein"
    },

    "ru":{
      "msg0":"Код",
      "msg":["введён верно","должен быть введён","введён неверно"],
      "placeH":"пожалуйста, введите код"
    }
  }
}
```
