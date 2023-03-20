import { videosInVsc } from "../scripts/data.js";
console.log(videosInVsc);

const videos = JSON.parse(localStorage.getItem("videos")) || videosInVsc;

const form = document.querySelector(".form-new-video");
console.log(form);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // const formChildren = Array.from(form.children);
  // console.log(formChildren.filter((e) => {e}))
  const title = document.getElementById("title");
  const src = document.getElementById("src");
  const img = document.getElementById("img");
  const name = document.getElementById("name");
  const category = document.getElementById("category");
  const views = document.getElementById("views");
  const min = document.getElementById("min");
  const minutes = document.getElementById("minutes");
  const linkImg = document.getElementById("linkImg");

  const arrayInput = [
    title.value,
    src.value,
    img.value,
    name.value,
    category.value,
    views.value,
    min.value,
    minutes.value,
    linkImg.value,
  ];

  const lastVideo = videos.length;
  const nextVideo = lastVideo + 1;
  let newVideo = {
    id: nextVideo,
    src: `${src.value}`,
    title: `${title.value}`,
    img: `${img.value}`,
    category: `${category.value}`,
    creator: `${name.value}`,
    views: `${views.value}`,
    min: `${min.value}`,
    minutes: `${minutes.value}`,
    linkImg: `${linkImg.value}`,
  };

  const validate = (array) => {
    array.forEach((input) => {
      if (input == "") {
        console.log(true)
        newVideo = ""
        Swal.fire({
          title: "Existen campos vacios. Por favor diligenciar todos los campos",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "El nuevo video ha sido creado exitosamente",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  }

  console.log(validate(arrayInput));





  console.log(typeof (newVideo))

  if (typeof (newVideo) == 'object') {
    console.log("siii")

    console.log(videos.push(newVideo));
  localStorage.setItem("videos", JSON.stringify(videos));
  }
  //  console.log(newVideo)
  //  console.log(videos);


  form.reset();
});
