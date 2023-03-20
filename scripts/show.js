import { videosInVsc } from "../scripts/data.js";
console.log(videosInVsc)

const videos = JSON.parse(localStorage.getItem("videos")) || videosInVsc;

const showVideo = document.querySelector('.container-show-video');
console.log(showVideo);

const showOneVideo = (container, video) => {
  // creao el elemento article
  const article = document.createElement('article');
  // creo contenido de elemento
  article.innerHTML = `
  <iframe src=${video.src} class="video-show" title=${video.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <article class="details">
    <div class="avatar-show">
      <img class="img-creator" src="${video.img}" alt="">
    </div>
    <div class="title-detail">
      <h3 class="title-video-show" >${video.title}</h3>
      <p class="views-show"> ${video.views} Vistas - ${video.min}</p>
    </div>
  </article>
  `;
  // agrego el elemento al html
  container.appendChild(article);
};

  document.addEventListener("DOMContentLoaded", () => {
  //escuchar el id en el local
  const videoIdParse = JSON.parse(localStorage.getItem("videoId")) || 0;
  console.log(videoIdParse)
  // convierto a number el string que me devuelve jsonParse
  const idToNumber = Number(videoIdParse);
  console.log(idToNumber)
  //Teniendo el id voy al array de videos
  const videoFinded = videos.find(
    (video) => video.id === idToNumber
  );
  console.log(videoFinded)

  showOneVideo(showVideo, videoFinded);




// seccion de videossugeridos

const videoSuggested = document.querySelector('.container-suggested-videos');
console.log(videoSuggested);
const onlySuggested = videos.filter(item => item.id !== idToNumber);
console.log(onlySuggested)

onlySuggested.forEach(video => {
videoSuggested.innerHTML += `
<div class="suggested-video">
        <article class="">
          <img class="img-mini" src=${video.linkImg}   data-video="video" id=${video.id}>
        </article>
        <article class="video-sect2-vs">
        <div id="none">
          <img id="db-imag" class="img-creator-dn" src="${video.img}" alt="">
        </div>
          <div class="">
            <h3 class="video-title-vs" data-video="video" id=${video.id}>${video.title}</h3>
            <p class="creator-vs" data-video="video" id=${video.id}> ${video.creator}</p>
            <p class="creator-vs" data-video="video" id=${video.id}> ${video.views} Vistas - ${video.min}</p>
          </div>
        </article>
</div>`
});
//4. Escucho el click sobre cada mini video
document.addEventListener("click", (event) => {
  console.log(event.target);
//indico el atributo donde quiero escuchar el click
  const videoTarget = event.target.getAttribute("data-video");
  if (videoTarget === "video") {
    // event.preventDefault();
    console.log('voy a ver video');
    const videoId = event.target.getAttribute("id");
    //pasar el objeto al json
    localStorage.setItem("videoId", JSON.stringify(videoId));
    window.location.href = "./show.html";
  }
});





})
