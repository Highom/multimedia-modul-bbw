const imgWrapperEditing = document.getElementById("pictureWrapperEditing");
const imgTechniqueWrapper = document.getElementById("pictureWrapperTechnique");
const carouselInner = document.getElementsByClassName("carousel-inner")[0];
const imgFolderEditing = "media/editing/";
const imgFolderTechnique = "media/technique/";
const imgFolderCarousel = "media/exampleImgs/";
const imagesTechnique = [
    ["charlie","Here we worked with the depth of field. The first image has a wide aperture and because of that almost everything is in focus. The second one was shot with a small aperture and because of it, only Charlie (my dog) is in focus while the Background is blurred out"]
] // ["image name", "image text"]
const images = [
    ["ceJa", "cutting out part of image and replacing it with another image + brightness adjustment on the other image"]
    ,["vacation","changed the background and added other images into it, then added text with a drop shadow again"]
    ,["Pepijn","Here I used overlays and color shifts to create a glitch like effect. The text is made with a drop shadow"]
    ,["debiTrain", "Here I used a Gradient to create a duotone effect"]
];

const carouselImages = ["DSC_0606.jpg","DSC_0607.jpg","DSC_0608.jpg","DSC_0613.jpg"];

imgTechniqueWrapper.removeChild(imgTechniqueWrapper.children[0]);

imagesTechnique.forEach(function(image, i) {
    const flexdiv = document.createElement("div");
    const div = document.createElement("div");
    const imgsdiv = document.createElement("div");
    const imgdiv1 = document.createElement("div");
    const imgdiv2 = document.createElement("div");
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");
    const text = document.createElement("p");

    flexdiv.className = "col-sm-4 col-xs-12 flex-item";
    flexdiv.id = "imgBeforeAfter" + (i+1);
    div.className = "card h-100" 
    imgsdiv.className = "imgrow"
    imgdiv1.className = "imgdiv";
    imgdiv2.className = "imgdiv";
    img1.className = "img-fluid staticImgLib img-enlargeable";
    img2.className = "img-fluid staticImgLib img-enlargeable";
    img1.src = imgFolderTechnique + image[0] + "-1.jpg";
    img2.src = imgFolderTechnique + image[0] + "-2.jpg";
    text.textContent = image[1];

    imgTechniqueWrapper.appendChild(flexdiv);
    flexdiv.appendChild(div);
    div.appendChild(imgsdiv);
    imgsdiv.appendChild(imgdiv1);
    imgsdiv.appendChild(imgdiv2);
    div.appendChild(text);
    imgdiv1.appendChild(img1);
    imgdiv2.appendChild(img2);
});

//remove the loading message
imgWrapperEditing.removeChild(imgWrapperEditing.children[0]);

images.forEach(function(image, i) {
    const flexdiv = document.createElement("div");
    const div = document.createElement("div");
    const imgsdiv = document.createElement("div");
    const imgdiv1 = document.createElement("div");
    const imgdiv2 = document.createElement("div");
    const beforeText = document.createElement("p");
    const afterText = document.createElement("p");
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");
    const text = document.createElement("p");

    flexdiv.className = "col-sm-4 col-xs-12 flex-item";
    flexdiv.id = "imgBeforeAfter" + (i+1);
    div.className = "card h-100" 
    imgsdiv.className = "imgrow"
    imgdiv1.className = "imgdiv";
    imgdiv2.className = "imgdiv";
    img1.className = "img-fluid staticImgLib img-enlargeable";
    img2.className = "img-fluid staticImgLib img-enlargeable";
    img1.src = imgFolderEditing + image[0] + "-1.jpg";
    img2.src = imgFolderEditing + image[0] + "-2.jpg";
    text.textContent = image[1];
    beforeText.textContent = "Before";
    afterText.textContent = "After";

    imgWrapperEditing.appendChild(flexdiv);
    flexdiv.appendChild(div);
    div.appendChild(imgsdiv);
    imgsdiv.appendChild(imgdiv1);
    imgsdiv.appendChild(imgdiv2);
    div.appendChild(text);
    imgdiv1.appendChild(beforeText);
    imgdiv1.appendChild(img1);
    imgdiv2.appendChild(afterText);
    imgdiv2.appendChild(img2);
});


carouselImages.forEach(function(image, i) {
    const carouselItem = document.createElement("div");
    const carouselCaption = document.createElement("div");
    const img = document.createElement("img");


    if (i == 0) {
        carouselItem.className = "carousel-item active";        
    }else{
        carouselItem.className = "carousel-item";
    }
    img.src = imgFolderCarousel + image;
    img.className = "img-fluid";
    carouselCaption.className = "carousel-caption d-none d-md-block"

    carouselItem.appendChild(img);
    carouselItem.appendChild(carouselCaption)
    carouselInner.appendChild(carouselItem);
});


//make images with .img-enlargeable full screen on click
$('.img-enlargeable').click(function() {
    var src = $(this).attr('src');
    var modal;
  
    function removeModal() {
      modal.remove();
      $('body').off('keyup.modal-close');
    }
    modal = $('<div>').css({
      background: 'RGBA(0,0,0,.5) url(' + src + ') no-repeat center',
      backgroundSize: 'contain',
      width: '100%',
      height: '100%',
      position: 'fixed',
      zIndex: '10000',
      top: '0',
      left: '0',
      cursor: 'zoom-out'
    }).click(function() {
      removeModal();
    }).appendTo('body');
    //handling ESC
    $('body').on('keyup.modal-close', function(e) {
      if (e.key === 'Escape') {
        removeModal();
      }
    });
  });