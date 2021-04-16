var imgWrapper = document.getElementById("pictureWrapper")
var imgFolder = "media/images/"
var images = [["lenny", "Here the bottle magically fell down"]]; // ["image name", "image text"]

//remove the loading message
imgWrapper.removeChild(imgWrapper.children[0]);      

images.forEach(function(image, i) {
    const div = document.createElement("div");
    const imgdiv1 = document.createElement("div");
    const imgdiv2 = document.createElement("div");
    const beforeText = document.createElement("p");
    const afterText = document.createElement("p");
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");
    const text = document.createElement("p");

    div.className = "col-sm-4 col-xs-12 flex-item card";
    div.id = "imgBeforeAfter" + (i+1);
    imgdiv1.className = "imgdiv";
    imgdiv2.className = "imgdiv";
    img1.className = "img-fluid";
    img2.className = "img-fluid";
    img1.src = imgFolder + image[0] + "-1.jpg";
    img2.src = imgFolder + image[0] + "-2.jpg";
    text.textContent = image[1];
    beforeText.textContent = "Before";
    afterText.textContent = "After";

    imgWrapper.appendChild(div);
    div.appendChild(imgdiv1);
    div.appendChild(imgdiv2);
    div.appendChild(text);
    imgdiv1.appendChild(beforeText);
    imgdiv1.appendChild(img1);
    imgdiv2.appendChild(afterText);
    imgdiv2.appendChild(img2);
});