import { videosInVsc } from "./data.js";
console.log(videosInVsc)

const videoInMiniature = document.querySelector('.container-videos');
console.log(videoInMiniature);

const videos = JSON.parse(localStorage.getItem("videos")) || videosInVsc;

const showVideos = (container, videosList) => {
  //Vacio el contenedor
  container.innerHTML = "";
  //Recorro el array
  videosList.forEach((video) => {
    container.innerHTML += `
      <div class="videos">
        <article class="img-videos">
          <img class="img-ppl" src=${video.linkImg}   data-video="video" id=${video.id}>
          <div class="container-minutes"><span class="minutes">${video.minutes}</span></div>
        </article>
        <article class="video-sect2">
          <div class="avatar">
            <img class="img-profile" src="${video.img}" alt="">
          </div>
          <div class="content">
            <h3 class="video-title"  data-video="video"  id=${video.id}>${video.title}</h3>
            <p class="creator"  data-video="video"  id=${video.id}> ${video.creator}</p>
            <p class="views"  data-video="video"  id=${video.id}> ${video.views} Vistas - ${video.min}</p>
          </div>
        </article>
      </div>
        `;
  });
};


document.addEventListener('DOMContentLoaded', () => {
  showVideos(videoInMiniature, videos);
})




//4. Escucho el click sobre cada video
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
    window.location.href = "./pages/show.html";
  }
});


//Aplico filtro de categorys

const categories = ['all'];

videos.forEach(video => {
  if (!categories.includes(video.category)) {
    categories.push(video.category);
  }
  // console.log(categories)

//escucho click sobre boton
  document.addEventListener("click", (event) => {

    const categoryFilter = event.target.getAttribute("name");
    // console.log(categoryFilter)
    // const traerLi = event.target.querySelector('.')
    // categoryFilter.classList.remove("tag_inactive");
    // categoryFilter.classList.add("tag-active");
    if (categoryFilter === "all") {
      showVideos(videoInMiniature, videos);
      // console.log("se veran todos")
    } else {
      const videosFilter = videos.filter((element) => element.category === categoryFilter
      );
      showVideos(videoInMiniature, videosFilter);

      // console.log("se vera filtrado")
    }
  })

});

const tagInactive =document.querySelector('.tag_inactive');
tagInactive.classList.add('tag-active');
const tagActive =document.querySelector('.tag-active');
tagActive.classList.add('tag_inactive');


//Filtro por buscador por titulo con submit
const search = document.getElementById('form-search');
search.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(search)
  const searchByTitle = event.target;
  console.log(searchByTitle.value)
  const videosFilterByTitle = videos.filter((element) => element.title.toLowerCase().includes(searchByTitle.value.toLowerCase()));
  console.log(videosFilterByTitle)
  showVideos(videoInMiniature, videosFilterByTitle);
});
//Filtro por buscador por titulo con keyup
  const searchKeyUp = document.getElementById('mySearch');
    searchKeyUp.addEventListener("keyup", (event) => {
      event.preventDefault();
      const searchByTitle = event.target;
      console.log(searchByTitle.value)
      const videosFilterByTitle = videos.filter((element) => element.title.toLowerCase().includes(searchByTitle.value.toLowerCase()));
      console.log(videosFilterByTitle)
      showVideos(videoInMiniature, videosFilterByTitle);
  });
 //filtro buscador por creador
 const searchByCreator = document.getElementById('mySearch');
  searchByCreator.addEventListener("keyup", (event) => {
    event.preventDefault();
    const searchByCreator = event.target;
    console.log(searchByCreator.value)
    const videosFilterByCreator = videos.filter((element) => element.creator.toLowerCase().includes(searchByCreator.value.toLowerCase()));
    console.log(videosFilterByCreator)
    showVideos(videoInMiniature, videosFilterByCreator);
  });

// const allSearch = (eventParam, container) => {
//   // const a = searchType
//   const search = document.getElementById(`${container}`);
//   search.addEventListener(`${eventParam}`, (event) => {
//     event.preventDefault();
//     const search = event.target;
//     console.log(search.value)
//     const videosFilter = videos.filter((element) => element.title.toLowerCase().includes(search.value.toLowerCase()));
//     console.log(videosFilter)
//     showVideos(videoInMiniature, videosFilter);
//   });
// }
// allSearch("keyup", 'mySearch');
