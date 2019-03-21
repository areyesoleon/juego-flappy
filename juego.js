var bg;
var tubos;
var flappy;
var salto;
var timer;
var puntos;
var txtPuntos;
var arrData = [];
var enX = [];
var contador = 0;
var Juego = {
  preload: function () {
    juego.load.image('bg', 'img/bg.jpeg');
    juego.load.spritesheet('pajaros', 'img/pajaro.png', 43, 30);
    juego.load.image('tubo', 'img/tubo.png');
    juego.forceSingleUpdate = true;
  },
  create: function () {
    bg = juego.add.tileSprite(0, 0, 370, 550, 'bg');
    juego.physics.startSystem(Phaser.Physics.ARCADE);
    tubos = juego.add.group();
    tubos.enableBody = true;
    tubos.createMultiple(20, 'tubo');

    flappy = juego.add.sprite(100, 245, 'pajaros');
    flappy.frame = 1;
    flappy.anchor.setTo(0, 0.5);
    flappy.animations.add('vuelo', [0, 1, 2], 20, true);
    juego.physics.arcade.enable(flappy);
    flappy.body.gravity.y = 1200;
    salto = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    salto.onDown.add(this.saltar, this);
    timer = juego.time.events.loop(1500, this.crearColumna, this);
    puntos = -1;
    txtPuntos = juego.add.text(20, 20, "0", { font: "30px Arial", fill: "#fff" })
  },
  update: function () {
    if (flappy.inWorld == false) {
      this.state.start("Game_Over");
    }
    else if (flappy.position.y > 460) {
      flappy.alive = false;
      tubos.forEachAlive(function (t) {
        t.body.velocity.x = 0;
      }, this);
      this.state.start("Game_Over");
    }
    else {
      bg.tilePosition.x -= 1;
    }
    flappy.animations.play('vuelo');
    if (flappy.angle < 20) {
      flappy.angle += 1;
    }
    juego.physics.arcade.overlap(flappy, tubos, this.tocoTubo, null, this);
  },
  saltar: function () {
    contador +=1;
    enX.push(contador);
    arrData.push(flappy.body.velocity.y);
    new Chart(document.getElementById("line-chart"), {
      type: 'line',
      data: {
        labels: enX,
        datasets: [{
          data: arrData,
          label: "Flappy",
          borderColor: "#3e95cd",
          fill: false
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Fisica 1'
        }
      }
    });
    flappy.body.velocity.y = -350;
    juego.add.tween(flappy).to({ angle: -20 }, 100).start();
  },
  crearColumna: function () {
    var hueco = Math.floor(Math.random() * 5) + 1;
    for (var i = 0; i < 8; i++) {
      if (i != hueco && i != hueco + 1) {
        this.crearUnTubo(370, i * 55 + 20);
      }
    }
    puntos += 1;
    txtPuntos.text = puntos;
  },
  crearUnTubo: function (x, y) {
    var tubo = tubos.getFirstDead();
    tubo.reset(x, y);
    tubo.body.velocity.x = -180;
    tubo.checkWorldBounds = true;
    tubo.outOfBoundsKill = true;
  },
  tocoTubo: function () {
    if (flappy.alive == false) {
      return;
    }
    flappy.alive = false;
    juego.time.events.remove(timer);
    tubos.forEachAlive(function (t) {
      t.body.velocity.x = 0;
    }, this);
  }
}

// chart
// window.onload = function () {
//   new Chart(document.getElementById("line-chart"), {
//     type: 'line',
//     data: {
//       labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
//       datasets: [{
//         data: arrData,
//         label: "Africa",
//         borderColor: "#3e95cd",
//         fill: false
//       }]
//     },
//     options: {
//       title: {
//         display: true,
//         text: 'World population per region (in millions)'
//       }
//     }
//   });
// }
// window.onload = function() {
//   var ctx = document.getElementById('myChart');
//   var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
//   });
// }


