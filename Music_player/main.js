const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playerMusic = $('.player-music');
const imgCD = $('.frame-music_cd .cd-img');
const infoName = $('.frame-music_song .song-name');
const infoAuthor = $('.frame-music_song .song-author');
const audio = $('#audio');
const playBtn = $('.btn-play');
const iconFavourite = $('.frame-music_icon-add-favourite');

const frameProgressBar = $('.frame-music_progress-bar');
const progressBar = $('.progress-bar');
const valueProgress = $('.progress-bar_value');
const timeCurrent = $('.progress-time_current');
const timeDuration = $('.progress-time_duration');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomSong = $('.btn-random');

const iconCloseList = $('.music_close-list-icon');
const descriptionList = $('.frame-music_icon-list .discribe');
const iconlist = $('.frame-music_icon-list');
const listSongs = $('.frame-playlist');

const app = {
     currentIndex: 0,
     isPlaying: false,
     isHoldProgressBar: false,
     isRandom: false,
     songs: [
          {
               name: "Attention",
               author: "Charlie Puth",
               image: "./assets/img/AlanWalker.jpg",
               path: "./assets/music/song1.mp3"
          },
          {
               name: "Nevada",
               author: "Monstercat",
               image: "./assets/img/tải xuống (2).jpg",
               path: "./assets/music/song2.mp3"
          },
          {
               name: "Allfallsdown",
               author: "Alan walker",
               image: "./assets/img/tải xuống.jpg",
               path: "./assets/music/song3.mp3"
          },
          {
               name: "We Don't Talk Anymore",
               author: "Charlie puth",
               image: "./assets/img/tải xuống (1).jpg",
               path: "./assets/music/song4.mp3"
          },
          {
               name: "Đau để trưởng thành",
               author: "OnlyC",
               image: "./assets/img/1659992795971_300.jpg",
               path: "./assets/music/song5.mp3"
          },
          {
               name: "Anh đã từ bỏ rồi đấy",
               author: "LyriC",
               image: "./assets/img/tải xuống (3).jpg",
               path: "./assets/music/song6.mp3"
          },
          {
               name: "Hey girl",
               author: " Gerry Goffin and Carole King",
               image: "./assets/img/DELAYS_HEY+GIRL-475701b.jpg",
               path: "./assets/music/song7.mp3"
          }

     ],
     defineProperties: function () {
          Object.defineProperty(this, 'currentSong', {
               get: function () {
                    return this.songs[this.currentIndex];
               }
          })
     },
     handleEvent: function () {
          const _this = this;
          iconFavourite.onclick = function () {
               iconFavourite.classList.toggle('favourite')
          }
          /*xử lý phần cd quay */
          const imgCDAnimate = imgCD.animate([{ transform: "rotate(360deg)" }],
               {
                    /* time */
                    duration: 10000,
                    /* loop */
                    iterations: Infinity,
               }
          );
          imgCDAnimate.pause();
          playBtn.onclick = function () {
               if (_this.isPlaying) {
                    audio.pause();
               } else {
                    audio.play();
               }
               /* khi song được play */
               audio.onplay = function () {
                    _this.isPlaying = true;
                    playBtn.classList.add('playing');
                    imgCDAnimate.play();
               }
               /* khi song dc pause */
               audio.onpause = function () {
                    _this.isPlaying = false;
                    playBtn.classList.remove('playing');
                    imgCDAnimate.pause();
               }
               /* change song */
               audio.ontimeupdate = function () {
                    if (audio.duration) {
                         timeCurrent.textContent = _this.timeFormat(audio.currentTime);
                         timeDuration.textContent = _this.timeFormat(audio.duration);
                         valueProgress.style.width = `${audio.currentTime / audio.duration * 100}%`;
                    }

               }
               valueProgress.onchange = function (e) {
                    console.log(e.target);
               }
          }
          randomSong.onclick = function () {
               _this.isRandom = !_this.isRandom;
               randomSong.classList.toggle('being-random');
          }

          nextBtn.onclick = function () {
               if(_this.isRandom){
                    _this.playRandomSong();
               }else{
                    _this.nextSong();
                    audio.play();
               }
          }

          prevBtn.onclick = function () {
               if(_this.isRandom){
                    _this.playRandomSong();
               }else{
                    _this.prevSong();
                    audio.play();
               }
          }

          iconlist.onclick = function () {
               listSongs.classList.add('playlistOpen');
               descriptionList.style.opacity = 0;

          }

          iconCloseList.onclick = function () {
               listSongs.classList.remove('playlistOpen');
               descriptionList.style.opacity = 1;
          }

          frameProgressBar.addEventListener("mousedown", e => {
               _this.isHoldProgressBar = true;
          });
          window.addEventListener("mousemove", e => {
               if (_this.isHoldProgressBar) {
                    const rect = progressBar.getBoundingClientRect();
                    const percentProgress = parseFloat(((e.pageX - rect.left) / progressBar.offsetWidth) * 100);
                    if (percentProgress >= 0 && percentProgress <= 100) {
                         valueProgress.style.width = `${percentProgress}%`;
                    } else if (percentProgress < 0) {
                         valueProgress.style.width = `1%`;
                    } else if (percentProgress > 100) {
                         valueProgress.style.width = `99%`;
                    }
                    playerMusic.classList.add('player-music--hover-progress');
               }
          });
          window.addEventListener("mouseup", e => {
               if (_this.isHoldProgressBar) {
                    _this.isHoldProgressBar = false;
                    const rect = progressBar.getBoundingClientRect();
                    let percentProgress = parseFloat(((e.pageX - rect.left) / progressBar.offsetWidth) * 100);
                    if (percentProgress < 0) {
                         percentProgress = 0;
                    } else if (percentProgress > 100) {
                         percentProgress = 100;
                    }
                    audio.currentTime = ((percentProgress / 100) * audio.duration);
                    playerMusic.classList.remove('player-music--hover-progress');
               }
          })

     },
     render: function () {
          const htmls = this.songs.map(song => {
               return `
               <li class="playlist_item">
                    <div class="playlist_item-img">
                     <img src="${song.image}" alt="###">
                    </div>
                    <div class="playlist-item_info">
                         <h3 class="playlist-item_name color-text">${song.name}</h3>
                         <p class="playlist-item_author color-text">${song.author}</p>
                    </div>
                    <div class="playlist-item_options">
                     <i class="fa-solid fa-ellipsis"></i>
                    </div>
               </li>
               `
          });
          $('.playlist_songs').innerHTML = htmls.join('');
     },
     timeFormat: function (seconds) {
          let minute = Math.floor(seconds / 60);
          let second = Math.floor(seconds % 60);
          minute = minute < 10 ? "0" + minute : minute;
          second = second < 10 ? "0" + second : second;
          return minute + ":" + second;
     },
     loadCurrentSong: function () {
          infoName.textContent = this.currentSong.name;
          infoAuthor.textContent = this.currentSong.author;
          imgCD.src = this.currentSong.image;
          audio.src = this.currentSong.path;

     },
     playRandomSong: function () {
          let newCurrentIndex 
          do{
               newCurrentIndex = Math.floor(Math.random() * this.songs.length);
          }while(newCurrentIndex === this.currentIndex);
          this.currentIndex = newCurrentIndex;
          this.loadCurrentSong();
     },
     nextSong: function () {
          this.currentIndex++;
          if (this.currentIndex > this.songs.length - 1) {
               this.currentIndex = 0;
          }
          this.loadCurrentSong();
     },
     prevSong: function () {
          this.currentIndex--;
          if (this.currentIndex < 0) {
               this.currentIndex = (this.songs.length - 1);
          }
          this.loadCurrentSong();
     },
     start: function () {
          /* định nghĩa các thuộc tính cho object */
          this.defineProperties();
          /* lắng nghe và xử lý các event */
          this.handleEvent();
          /* tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng */
          this.loadCurrentSong();
          /* chạy chương trình */
          this.render();
     }
};
app.start()

