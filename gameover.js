var Game_Over ={
  preload: function(){
    juego.stage.backgroundColor = '#fff';
    juego.load.image('boton','img/btn.png');
  },
  create: function(){
    var boton =this.add.button(juego.width/2, juego.height/2,'boton',this.iniciarJuego,this);
    boton.anchor.setTo(0.5);
    var txtPuntosEtiqueta = juego.add.text(juego.width/2 -50,juego.height/2 -85,"Puntos:",{font:"bold 24px sans-serif",fill:"black",align:"center"});
    if(puntos == -1 ){
      puntos = 0;
    }
    var txtPuntosNumero = juego.add.text(juego.width/2 +50,juego.height/2 -85,puntos.toString(),{font:"bold 24px sans-serif",fill:"black",align:"center"});
    txtPuntosEtiqueta.anchor.setTo(0.5);
    txtPuntosNumero.anchor.setTo(0.5);
    var txtTitulo = juego.add.text(juego.width/2,juego.height/2 -135,"Juego terminado",{font:"bold 30px sans-serif",fill:"black",align:"center"});
    txtTitulo.anchor.setTo(0.5);
  },
  iniciarJuego: function(){
    this.state.start("Juego");
  }
}
