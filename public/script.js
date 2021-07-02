const imgWrapperEditing = document.getElementById("pictureWrapperEditing");
const imgTechniqueWrapper = document.getElementById("pictureWrapperTechnique");
const VideoTechniqueWrapper = document.getElementById("VideoTechnique");
const carouselInner = document.getElementsByClassName("carousel-inner")[0];
const firebaseContainer = document.getElementById("firebaseContainer");
const imgFolderEditing = "media/editing/";
const imgFolderTechnique = "media/technique/";
const imgFolderVideoEditing = "media/videoTechniques/";
const imgFolderCarousel = "media/exampleImgs/";
const imagesTechnique = [
    ["charlie","Here we worked with the depth of field. The first image has a wide aperture and because of that almost everything is in focus. The second one was shot with a small aperture and because of it, only Charlie (my dog) is in focus while the Background is blurred out"]
    ,["iso","In the first pic I used an ISO of 400 with an exposure time of 1/50. The second picture uses an ISO of Hi1. To not overlight the second picture with the high ISO I needed to use an exposure time of 1/4000. As you can see the higher ISO gives the Image more noise. But in dark enviroments where the exposure time can't be longer, the ISO can be used to make the image more bright"]
    ,["exposure","the first picture uses an exposure time of 1/50 while the second one uses an exposure time of 1/10. As you can see, the longer the exposure time, the more light gets caught by the camera. With longer exposure time stabilisation becomes a bigger issue as small movements could make the image loose focus"]
    ,["onethree", "the first picture uses the 1/3 rule. one third of the image is ground while the rest is sky. the second one is just 50/50. As you can see the 1/3 rule makes the image more aesthetically pleasing"]
] // ["image name", "image text"]
const imagesEditing = [
    ["ceJa", "cutting out part of image and replacing it with another image + brightness adjustment on the other image"]
    ,["vacation","changed the background and added other images into it, then added text with a drop shadow again"]
    ,["Pepijn","Here I used overlays and color shifts to create a glitch like effect. The text is made with a drop shadow"]
    ,["debiTrain", "Here I used a Gradient to create a duotone effect"]
    ,["background", "The Image has been sharpened and cropped. Then, the whole image was blurred so that it can be used better as a background image"]
    ,["jabra", "The Image got croppped and the Colors were adjusted to look more dreamy"]
    ,["kb", "The Image got cropped"]
    ,["pfp","Here I cropped the Picture and removed myself from the background"]
];
const imagesVideoEditing = [
  ["formats.jpg","Video Formats","I used mp4 as it is the most used video format"],
  ["camera.png","Equipment","I used an Canon EOS 250D and a FeiyuTech MG V2 gimbal to film all of the scenes."],
  ["motive.png","Motive and Rule of Thirds","I used this motive because the water flowing and the sound of it gives a refreshing feeling. I found this a good transition inbetween the work out video. Also this shot complies with the rule of thirds, two thirds of it a water and one third is the shore"],  
  ["cutClip.png","Video cutting","First we cut the single clips and remove the parts we don't need"],
  ["addClips.PNG","Putting it together","Then we take the parts we cut out and put them all together."],
  ["cutAndAddAudio.PNG", "Cutting and adding the Audio", "Then we take our sounds and cut and add them. Here I had to cut out the Music at the parts of the nature sounds and made them less loud. I also had to replace audio at the end because you could hear me talk"],
  ["transitions.PNG","Transitions","We use transitions to fade between or fade in or fade out items. Here we used an additive dissolve to fade in text and later again to fade it out"],
  ["text.PNG","Text or images","You can add text and images to your scene and style it like you want. You can also move it around with keyframes so it follows a point of your video"],
  ["tracking.PNG","Tracking Images", "You can track images to surfaces by using motion keyframes. Here I added keyframes to track the image to the skateboard. You can see the path the image will take by the blue line"]
];

const carouselImages = ["DSC_0481.jpg","DSC_0606.jpg","DSC_0607.jpg","DSC_0608.jpg","DSC_0613.jpg"];

const firebaseImages = [];

document.addEventListener('DOMContentLoaded', function() {
  const loadEl = document.querySelector('#load');
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  //
  // firebase.auth().onAuthStateChanged(user => { });
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.firestore().doc('/foo/bar').get().then(() => { });
  // firebase.functions().httpsCallable('yourFunction')().then(() => { });
  // firebase.messaging().requestPermission().then(() => { });
  firebase.storage().ref('/images').listAll().then((res) => {
    res.items.forEach((item,i) => {
      item.getDownloadURL().then((url) => {
        firebaseImages.push(url);
        appendFirebaseImage(url,i);
      })
    });
  }).catch((error) => {
    console.error(error);
  });
  // firebase.analytics(); // call to activate
  // firebase.analytics().logEvent('tutorial_completed');
  // firebase.performance(); // call to activate
  //
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

  try {
    let app = firebase.app();
    let features = [
      'auth', 
      'database', 
      'firestore',
      'functions',
      'messaging', 
      'storage', 
      'analytics', 
      'remoteConfig',
      'performance',
    ].filter(feature => typeof app[feature] === 'function');
    loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
  } catch (e) {
    console.error(e);
    loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
  }
});

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

imagesEditing.forEach(function(image, i) {
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

//remove the loading message
VideoTechniqueWrapper.removeChild(VideoTechniqueWrapper.children[0]);

imagesVideoEditing.forEach(function(image, i) {
    const flexdiv = document.createElement("div");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("p");
    const text = document.createElement("p");

    flexdiv.className = "col-sm-4 col-xs-12 flex-item";
    flexdiv.id = "imgBeforeAfter" + (i+1);
    div.className = "card h-100";
    img.className = "img-fluid staticImgLib img-enlargeable";
    img.src = imgFolderVideoEditing + image[0];
    title.className = "font-weight-bold"
    title.textContent = image[1];
    text.textContent = image[2];

    VideoTechniqueWrapper.appendChild(flexdiv);
    flexdiv.appendChild(div);
    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(text);
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
    img.className = "img-fluid img-enlargeable";
    carouselCaption.className = "carousel-caption d-none d-md-block"

    carouselItem.appendChild(img);
    carouselItem.appendChild(carouselCaption)
    carouselInner.appendChild(carouselItem);
});

  firebaseContainer.removeChild(firebaseContainer.children[0]);

function appendFirebaseImage(url,i) {
  const flexdiv = document.createElement("div");
  const div = document.createElement("div");
  const img = document.createElement("img");

  flexdiv.className = "col-sm-4 col-xs-12 flex-item";
  flexdiv.id = "firebaseImages" + (i+1);
  div.className = "card h-100";
  img.className = "img-fluid staticImgLib";
  img.src = url;

  firebaseContainer.appendChild(flexdiv);
  flexdiv.appendChild(div);
  div.appendChild(img);
}

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

$(document).ready(function() {
  // Gets the video src from the data-src on each button
  var $videoSrc;  
  $('.video-btn').click(function() {
      $videoSrc = $(this).data( "src" );
  });
  
  // when the modal is opened autoplay it  
  $('#myModal').on('shown.bs.modal', function (e) {
      
  // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
  $("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
  })
      
  // stop playing the youtube video when I close the modal
  $('#myModal').on('hide.bs.modal', function (e) {
      // a poor man's stop video
      $("#video").attr('src',""); 
  })   
});
    
function uploadImage(){
  const ref = firebase.storage().ref('/images');
  const file = document.querySelector("#imageUpload").files[0];
  const task = ref.child(file.name).put(file);

  task
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then(url => {
    appendFirebaseImage(url,firebaseImages.length);
  })
}