//code for image preview
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

//code for color code
document.querySelector('#colorpicker').addEventListener('change', function() {
    document.querySelector('#hexcolor').value = this.value;
});

document.querySelector('#hexcolor').addEventListener('change', function() {
    document.querySelector('#colorpicker').value = this.value;
});


function downloadCard() {
    let element = document.getElementById('scientistCard')
    let colorpicker = document.getElementById('colorpicker')
    let scale = 2;
    colorpicker.classList.add('hide');

    domtoimage.toPng(element, {
        width: element.clientWidth * scale,
        height: element.clientHeight * scale,
        style: { transform: 'scale('+scale+')', transformOrigin: 'top left'}
      }).then(dataUrl => {
      domtoimage
        .toPng(element, {
            width: element.clientWidth * scale,
            height: element.clientHeight * scale,
            style: { transform: 'scale('+scale+')', transformOrigin: 'top left'}
        })
        .then(dataUrl2 => {
            var img = new Image();
            img.src = dataUrl;
            downloadURI(dataUrl, "Scientist-Card.png");
            colorpicker.classList.remove('hide');
        });
      });
    

    // domtoimage.toPng(element, {
    //         width: element.clientWidth * scale,
    //         height: element.clientHeight * scale,
    //         style: { transform: 'scale('+scale+')', transformOrigin: 'top left'}
    //     })
    //     .then(function (dataUrl) {
    //         var img = new Image();
    //         img.src = dataUrl;
    //         downloadURI(dataUrl, "Scientist-Card.png");
    //         colorpicker.classList.remove('hide');
    //     })
    //     .catch(function (error) { console.error('oops, something went wrong!', error); });
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




// change color


var radios = document.querySelectorAll('input[type=radio][name="color"]');

function changeHandler(event) {
    let body = document.querySelector('body')
    let card = document.querySelector('.wrapper .card-wrapper')
    
   if ( this.value === 'break' ) {
    body.classList.remove('study')
    card.classList.remove('study')
   } else if ( this.value === 'study' ) {
    body.classList.add('study')
    card.classList.add('study')
   }  
}

Array.prototype.forEach.call(radios, function(radio) {
   radio.addEventListener('change', changeHandler);
});
