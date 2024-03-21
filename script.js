let countdownbtn = document.querySelector(".simply-countdown");
simplyCountdown(countdownbtn, {
  year: 2024, // required
  month: 9, // required
  day: 28, // required
  hours: 8, // Default is 0 [0-23] integer
  words: {
    //words displayed into the countdown
    days: { singular: "hari", plural: "hari" },
    hours: { singular: "jam", plural: "jam" },
    minutes: { singular: "menit", plural: "menit" },
    seconds: { singular: "detik", plural: "detik" },
  },
});
// Fix menu hamburger dan layout lebar
const stickyTop = document.querySelector(".sticky-top");
const offcanvas = document.querySelector(".offcanvas");
offcanvas.addEventListener("show.bs.offcanvas", function () {
  stickyTop.style.overflow = "visible";
});
offcanvas.addEventListener("hidden.bs.offcanvas", function () {
  stickyTop.style.overflow = "hidden";
});

// Disable Scroll
const rootElement = document.querySelector(":root");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
const song = document.getElementById("song");
let isPlaying = false;

function disableScroll() {
  // Get the current page scroll position
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };

  rootElement.style.scrollBehavior = "auto";
}
function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  // localStorage.setItem("opened", "true");
  playAudio();
}

// play musikk
function playAudio() {
  song.volume = 0.5;
  audioIconWrapper.style.display = "flex";
  song.play();
  isPlaying = true;
}

// pause musikk
audioIconWrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    audioIcon.classList.add("bi-disc");
    audioIcon.classList.remove("bi-pause-circle");
    song.play();
  }
  isPlaying = !isPlaying;
};

// if (!localStorage.getItem("opened ")) {
// }
disableScroll();

// event submit ke gsheet
window.addEventListener("load", function () {
  const form = document.getElementById("my-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("Konfirmasi Kehadiranmu Terkirim!");
    });
  });
});

// Mengambil url di browser dan mengganti namanya
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("n") || "";
const pronoun = urlParams.get("p") || `Bapak/Ibu/Saudara i`;
const namaContainer = document.querySelector(".hero h4 span");
namaContainer.innerText = `${pronoun} ${nama},`.replace(/ ,$/, ",");

document.querySelector("#nama").value = nama;

// elemen apa yg menyimpan nama undangan

// ngirim pronoun masing masing undangan
