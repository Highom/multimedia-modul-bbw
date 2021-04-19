var imgWrapper = document.getElementById("pictureWrapper")
var imgVerticalWrapper = document.getElementById("pictureWrapperVertical")
var imgFolder = "media/images/"
var images = [["ceJa", "cutting out part of image and replacing it with another image + brightness adjustment on the other image"]] // ["image name", "image text"]
var imagesVertical = [["debiTrain", "Here I used a Gradient to create a duotone effect"],["Pepijn","Here I used overlays and color shifts to create a glitch like effect. The text is made with a drop shadow"], ["vacation","changed the background and added other images into it, then added text with a drop shadow again"]]; // ["image name", "image text"]

//remove the loading message
imgWrapper.removeChild(imgWrapper.children[0]);      

images.forEach(function(image, i) {
    const flexdiv = document.createElement("div");
    const div = document.createElement("div");
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
    imgdiv1.className = "imgdiv";
    imgdiv2.className = "imgdiv";
    img1.className = "img-fluid";
    img2.className = "img-fluid";
    img1.src = imgFolder + image[0] + "-1.jpg";
    img2.src = imgFolder + image[0] + "-2.jpg";
    text.textContent = image[1];
    beforeText.textContent = "Before";
    afterText.textContent = "After";

    imgWrapper.appendChild(flexdiv);
    flexdiv.appendChild(div)
    div.appendChild(imgdiv1);
    div.appendChild(imgdiv2);
    div.appendChild(text);
    imgdiv1.appendChild(beforeText);
    imgdiv1.appendChild(img1);
    imgdiv2.appendChild(afterText);
    imgdiv2.appendChild(img2);
});

imgVerticalWrapper.removeChild(imgVerticalWrapper.children[0]);      

imagesVertical.forEach(function(image, i) {
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
    img1.className = "img-fluid img-blur";
    img2.className = "img-fluid img-blur";
    img1.src = imgFolder + image[0] + "-1.jpg";
    img2.src = imgFolder + image[0] + "-2.jpg";
    text.textContent = image[1];
    beforeText.textContent = "Before";
    afterText.textContent = "After";

    imgVerticalWrapper.appendChild(flexdiv);
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