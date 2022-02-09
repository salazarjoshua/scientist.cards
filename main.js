
let isFlipped = false;


/*-- Download Card ------*/

function downloadCard() {
    let card = document.getElementById('scientistCard')
    let colorpicker = document.getElementById('colorpicker')
    let cardFront = document.getElementById('cardFront')
    let cardBack = document.getElementById('cardBack')

    let scale = 2;

    if(isFlipped){
        cardFront.classList.add('hide');
        cardBack.style.transform = "rotateY(0)"
    } else {
        colorpicker.classList.add('hide');
        cardBack.classList.add('hide');
    }


    domtoimage.toPng(card, {
        width: card.clientWidth * scale,
        height: card.clientHeight * scale,
        style: { transform: 'scale('+scale+')', transformOrigin: 'top left'}
      }).then(dataUrl => {
      domtoimage
        .toPng(card, {
            width: card.clientWidth * scale,
            height: card.clientHeight * scale,
            style: { transform: 'scale('+scale+')', transformOrigin: 'top left'}
        })
        .then(dataUrl2 => {
            var img = new Image();
            img.src = dataUrl2;
            downloadURI(dataUrl2, "Scientist-Card.png");
            colorpicker.classList.remove('hide');
            cardFront.classList.remove('hide');
            cardBack.style.transform = "rotateY(180deg)"
            cardBack.classList.remove('hide');
            card.style.backgroundImage = "none";
        });
      });
}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}


/*-- Flip Card ------*/
function flipCard() {
    var card = document.getElementById("scientistCard");
    var btnFlip = document.getElementById("btnFlip");   

    card.classList.toggle("flip");

    btnFlip.disabled = true;
    setTimeout(() => {
        btnFlip.disabled = false;
    }, 800);

    isFlipped = !isFlipped;
}

/*-- Change Version ------*/
var radios = document.querySelectorAll('input[type=radio][name="color"]');

function changeHandler(event) {
    let body = document.querySelector('body')
    
   if ( this.value === 'version-break' ) {
    body.classList.remove('version-study');
    document.getElementById("cardBackImg").src="/assets/scientist-card-break-ver-back.svg";
   } else if ( this.value === 'version-study' ) {
    body.classList.add('version-study');
    document.getElementById("cardBackImg").src="/assets/scientist-card-study-ver-back.svg";
   }  
}

Array.prototype.forEach.call(radios, function(radio) {
   radio.addEventListener('change', changeHandler);
});

/*-- Image Input Preview ------*/
var reader = new FileReader();

reader.onload = function(e) {
    document.querySelector('#imager').setAttribute("src", e.target.result)
};

function readURL(input) {
    if (input.files && input.files[0]) {
        document.querySelector('#imager').style.visibility = "visible";
        reader.readAsDataURL(input.files[0]);
    }
}

document.querySelector('#image-input').addEventListener('change', function() {
    readURL(this);
});

/*-- Color Code ------*/
document.querySelector('#colorpicker').addEventListener('change', function() {
    document.querySelector('#hexcolor').value = this.value;
});

document.querySelector('#hexcolor').addEventListener('change', function() {
    document.querySelector('#colorpicker').value = this.value;
});

/*-- Auto Format Birthday ------*/
var cleave = new Cleave('.birthday', {
    date: true,
    delimiter: '-',
    datePattern: ['Y', 'm', 'd']
});
