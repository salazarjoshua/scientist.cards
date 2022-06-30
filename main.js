let isFlipped = false;

const body = document.querySelector('body');
const loadingGIF = document.querySelector('.loading');

const cardContainer = document.querySelector('.card-container');
const card = document.querySelector('.card');
const cardFront = document.getElementById('cardFront');
const cardBack = document.getElementById('cardBack');
const colorpicker = document.getElementById('colorpicker');

const btnGetPNG = document.getElementById('btnGetPNG');
const btnDownload = document.getElementById('btnDownload');
const btnFlip = document.getElementById("btnFlip");  
const btnBack = document.getElementById("btnBack");  

const mainButtons = document.querySelectorAll(".mainbtns");

const cardGenerator = document.querySelectorAll("[data-card='card-generator']");
const cardOutput = document.querySelectorAll("[data-card='card-output']");


const scale = 2;

let cardURL = '';

/*-- Download Card ------*/

function getPNG() {
    
    btnGetPNG.disabled = true;

    if(isFlipped){
        cardFront.classList.add('hide');
        cardBack.style.transform = "rotateY(0)"
    } else {
        colorpicker.classList.add('hide');
        cardBack.classList.add('hide');
    }

    domtoimage.toPng(card).then(dataUrl => {
      domtoimage.toPng(card, {  
            width: card.clientWidth * scale,
            height: card.clientHeight * scale,
            style: {
                transform: 'scale('+scale+')',
                transformOrigin: 'top left',
            }
        })
        .then(dataUrl2 => {
            card.style.boxShadow = "none";
            var newPNG = new Image();
            newPNG.src = dataUrl2;
            cardURL = dataUrl2;
            
            newPNG.classList.add("generated__png");
            colorpicker.classList.remove('hide');
            cardFront.classList.remove('hide');
            cardBack.classList.remove('hide');
            cardBack.style.transform = "rotateY(180deg)";
            card.style.backgroundImage = "none";


            loadingGIF.classList.remove('d-none');
            setTimeout(function() {
                loadingGIF.classList.add('d-none');
                cardContainer.appendChild(newPNG);
                cardOutput.forEach(cardGenerators => cardGenerators.classList.remove("d-none"))
            }, 1500); 
            hideCardGenerator();
            card.style.boxShadow = "0px 2px 16px rgba(0, 0, 0, 0.05), 0px 4px 16px rgba(0, 0, 0, 0.1)";
            card.style.display = "none";
            btnGetPNG.disabled = false;
        });
      });
}

function downloadCard() {
    downloadURI(cardURL, "Scientist-Card.png");
    btnDownload.disabled = true;
    setTimeout(() => {
        btnDownload.disabled = false;
        btnDownload.focus();
    }, 1500);
}


function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function hideCardGenerator() {
    cardGenerator.forEach(cardGenerators => cardGenerators.classList.add("d-none"))
    
}

function showCardGenerator() {
    const newpnghey = document.querySelector("img.generated__png")
    console.log(newpnghey);
    newpnghey.remove();
    card.style.display = "block";
    
    cardOutput.forEach(cardGenerators => cardGenerators.classList.add("d-none"))
    cardGenerator.forEach(cardGenerators => cardGenerators.classList.remove("d-none"))
}
btnBack.addEventListener('click', showCardGenerator)






btnGetPNG.addEventListener('click', getPNG);
btnDownload.addEventListener('click', downloadCard);





















/*-- Flip Card ------*/
function flipCard() {
    card.classList.toggle("flip");
    btnFlip.disabled = true;

    setTimeout(() => {
        btnFlip.disabled = false;
        btnFlip.focus();
    }, 800);

    isFlipped = !isFlipped;
}

btnFlip.addEventListener('click', flipCard);

/*-- Change Version ------*/
const radios = document.querySelectorAll('input[type=radio][name="color"]');
const cardBackImage = document.getElementById("cardBackImg");

function changeHandler(event) {
   if ( this.value === 'version-break' ) {
    body.classList.remove('version-study');
    cardBackImage.src="/assets/scientist-card-break-ver-back.svg";
   } else if ( this.value === 'version-study' ) {
    body.classList.add('version-study');
    cardBackImage.src="/assets/scientist-card-study-ver-back.svg";
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
const colorPicker = document.querySelector('#colorpicker');
const hexColor =  document.querySelector('#hexcolor');

colorPicker.addEventListener('change', function() {
    hexColor.value = this.value;
});

hexColor.addEventListener('change', function() {
    colorPicker.value = this.value;
});

/*-- Auto Format Birthday ------*/
var cleave = new Cleave('.birthday', {
    date: true,
    delimiter: '-',
    datePattern: ['Y', 'm', 'd']
});
