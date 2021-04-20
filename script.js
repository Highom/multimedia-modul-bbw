var imgWrapper = document.getElementById("pictureWrapper")
var imgTechniqueWrapper = document.getElementById("pictureWrapperTechnique")
var imgFolder = "media/images/"
var imgFolderTechnique = "media/technique/"
var imagesTechnique = [
]
var images = [
    ["ceJa", "cutting out part of image and replacing it with another image + brightness adjustment on the other image"],
    ["vacation","changed the background and added other images into it, then added text with a drop shadow again"],
    ["Pepijn","Here I used overlays and color shifts to create a glitch like effect. The text is made with a drop shadow"],
    ["debiTrain", "Here I used a Gradient to create a duotone effect"]
]; // ["image name", "image text"]  

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
imgWrapper.removeChild(imgWrapper.children[0]);

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
    img1.src = imgFolder + image[0] + "-1.jpg";
    img2.src = imgFolder + image[0] + "-2.jpg";
    text.textContent = image[1];
    beforeText.textContent = "Before";
    afterText.textContent = "After";

    imgWrapper.appendChild(flexdiv);
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