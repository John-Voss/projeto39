var fundo, fundo_image;
var jogador, jogador_image, jogador_morte;
var obstaculo1, obstaculo1_image, obstaculo1_die, obstaculo2, obstaculo2_image, obstaculo2_die, obstaculo3, obstaculo3_image, obstaculo3_die;
var grupoObstaculo1, grupoObstaculo2, grupoObstaculo3;
var pontuacao = 0;
var etapaJogo = 'JOGAR';
var gameOver, gameOver_image;
var som1;

function preload(){
  fundo_image = loadImage("images/Road.png");
  jogador_image = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  jogador_morte = loadImage("images/mainPlayer3.png");
  
  obstaculo1_image = loadAnimation('images/opponent1.png', 'images/opponent2.png');
  obstaculo1_die = loadImage("images/opponent3.png");
  
  obstaculo2_image = loadAnimation("images/opponent4.png","images/opponent5.png");
  obstaculo2_die = loadImage("images/opponent6.png");
  
  obstaculo3_image = loadAnimation("images/opponent7.png","images/opponent8.png");
  obstaculo3_die = loadImage("images/opponent9.png");
  
  som1 = loadSound("sound/bell.mp3");
  gameOver_image = loadImage("images/gameOver.png");
  
}

function setup(){ 
createCanvas(displayWidth,300);
  fundo = createSprite(2500, 150, 10, 300);
  fundo.addImage('fundo_image', fundo_image);
  jogador = createSprite(50, 50, 20, 50);
  jogador.addAnimation('jogador_image', jogador_image);
  jogador.scale = 0.06;
  jogador.addImage('player_die', jogador_morte);
  jogador.scale = 0.06;
  gameOver = createSprite(500, 150, 300, 150);
  gameOver.addImage('gameOver_image', gameOver_image);
  
  grupoObstaculo1 = new Group();
  grupoObstaculo2 = new Group();
  grupoObstaculo3 = new Group();
}

function draw() {
  background(0);
  if (etapaJogo === 'JOGAR') {
    if(pontuacao/10){
      camera.position.x = camera.position.x + 4;
    }
    obstaculos();
    jogador.y = mouseY;
    jogador.x = camera.position.x - 500;
    camera.position.y = jogador.y
    gameOver.x = camera.position.x - 150;
    gameOver.visible = false;  

    if(camera.position.x > 3600) {
      alert('ESTE É O FINAL DO MAPA, FAVOR ATUALIZAR A PÁGINA!');
    }
//pontuação
  pontuacao = pontuacao + (Math.round(frameRate()/60));
  if(keyDown('space') && etapaJogo === 'JOGAR') {
    som1.play();
  }
  if(jogador.isTouching(grupoObstaculo1)) {
    obstaculo1.changeAnimation('obs1_die', obstaculo1_die);
    jogador.changeAnimation('player_die', jogador_morte);
    pontuacao = 0;
    etapaJogo = 'ENCERRAR';
  }
  if(jogador.isTouching(grupoObstaculo2)){
    obstaculo2.changeAnimation('obs2_die', obstaculo2_die);
    jogador.changeAnimation('player_die', jogador_morte);
    pontuacao = 0;
    etapaJogo = 'ENCERRAR';
  }
  if(jogador.isTouching(grupoObstaculo3)) {
    obstaculo3.changeAnimation('obs3_die', obstaculo3_die);
    jogador.changeAnimation('player_die', jogador_morte);
    pontuacao = 0;
    etapaJogo = 'ENCERRAR';
  }
  }
  else if(etapaJogo === 'ENCERRAR') {
    gameOver.visible = true;
    pontuacao = 0;
    grupoObstaculo1.setLifetimeEach(-1);
    grupoObstaculo2.setLifetimeEach(-1);
    grupoObstaculo3.setLifetimeEach(-1);
    grupoObstaculo1.setVelocityXEach(0);
    grupoObstaculo2.setVelocityXEach(0);
    grupoObstaculo3.setVelocityXEach(0);
    if(keyDown('up')) {
      reset();
    }
  }

  drawSprites();
  if(etapaJogo === 'ENCERRAR') {
  fill('white');
  textSize(20);
  text('Aperte a seta para cima, se quiser reiniciar', camera.position.x, camera.position.y - 50);
  }
  fill('white');
  textSize(20);
  text('Score: '+ pontuacao, camera.position.x - 250, camera.position.y - 50);
}
function obstaculos() {
  if(frameCount% 200 === 0) {
    sorteio = Math.round(random(1,3));
    switch(sorteio) {
          case 1: obstaculo1 = createSprite(camera.position.x + 700, Math.round(random(250, 50)), 20, 50); obstaculo1.addAnimation('obs1_img', obstaculo1_image); obstaculo1.scale = 0.06; obstaculo1.addImage('obs1_die', obstaculo1_die);
                  obstaculo1.scale = 0.06; obstaculo1.velocityX = -(8); grupoObstaculo1.add(obstaculo1); obstaculo1.lifetime = 1000;
        break;
          case 2: obstaculo2 = createSprite(camera.position.x + 700, Math.round(random(250, 50)), 20, 50); obstaculo2.addAnimation('obs2_img', obstaculo2_image); obstaculo2.scale = 0.06; obstaculo2.addImage('obs2_die', obstaculo2_die); obstaculo2.scale = 0.06; obstaculo2.velocityX = -(9); obstaculo2.lifetime = 1000; grupoObstaculo2.add(obstaculo2);
        break;
        case 3: obstaculo3 = createSprite(camera.position.x + 700, Math.round(random(250, 50)), 20, 50); obstaculo3.addAnimation('obs3_img', obstaculo3_image); obstaculo3.scale = 0.06; obstaculo3.addImage('obs3_die', obstaculo3_die); obstaculo3.scale = 0.06; obstaculo3.velocityX = -(10); obstaculo3.lifetime = 1000; grupoObstaculo3.add(obstaculo3);
        break;
    }
  }
}
function reset() {
  etapaJogo = 'JOGAR';
  fundo.x = 2500;
  gameOver.visible = false;
  grupoObstaculo1.destroyEach();
  grupoObstaculo2.destroyEach();
  grupoObstaculo3.destroyEach();
  pontuacao = 0;
  grupoObstaculo1.setLifetimeEach(280);
  grupoObstaculo2.setLifetimeEach(415);
  grupoObstaculo3.setLifetimeEach(212);
  grupoObstaculo1.setVelocityXEach(-3);
  grupoObstaculo2.setVelocityXEach(-2);
  grupoObstaculo3.setVelocityXEach(-4); 
  jogador.changeAnimation('jogador_image', jogador_image);
  jogador.scale = 0.06;
}