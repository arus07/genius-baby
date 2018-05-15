var datv;
var datv1;
var datv2;
var datv3;
var datv4;
var rans;
var great;
var god;


var gameui = document.getElementById("gameui1");
var score = document.getElementById("fenshu");
var gameui2 = document.getElementById("gameui2");
var tsay = document.getElementById("bv");

console.log(score);

console.log(tsay);

var uniqueRandoms = [];
var numRandoms = 16;
function makeUniqueRandom() {
    // refill the array if needed
    if (!uniqueRandoms.length) {
        for (var i = 0; i < numRandoms; i++) {
            uniqueRandoms.push(i);
        }
    }
    var index = Math.floor(Math.random() * uniqueRandoms.length);
    var val = uniqueRandoms[index];

    // now remove that value from the array
    uniqueRandoms.splice(index, 1);

    return val;

}

var temp = makeUniqueRandom();

var uniqueRandoms1 = [];
var numRandoms1 = 29;
function makeUniqueRandom1() {
    // refill the array if needed
    if (!uniqueRandoms1.length) {
        for (var i = 0; i < numRandoms1; i++) {
            uniqueRandoms1.push(i);
        }
    }
    var index = Math.floor(Math.random() * uniqueRandoms1.length);
    var val = uniqueRandoms1[index];

    // now remove that value from the array
    uniqueRandoms1.splice(index, 1);

    return val;

}

var temp1 = makeUniqueRandom1();

var uniqueRandoms2 = [];
var numRandoms2 = 13;
function makeUniqueRandom2() {
    // refill the array if needed
    if (!uniqueRandoms2.length) {
        for (var i = 0; i < numRandoms2; i++) {
            uniqueRandoms2.push(i);
        }
    }
    var index = Math.floor(Math.random() * uniqueRandoms2.length);
    var val = uniqueRandoms2[index];

    // now remove that value from the array
    uniqueRandoms2.splice(index, 1);

    return val;

}

var temp2 = makeUniqueRandom2();




$.getJSON("data/wenda.json", function(json){
/*  alert("JSON Data: " + json[0].answer);*/
  datv = json[temp].question;
  datv1 = json[temp].answer1;
  datv2 = json[temp].answer2;
  datv3 = json[temp].answer3;
  datv4 = json[temp].answer4;
  rans = json[temp].right;
});

$.getJSON("data/tsay.json", function(json){

  talk = json[temp1];

});

$.getJSON("data/tsay-false.json", function(json){

  talk1 = json[temp2];

});





window.addEventListener("load",function() { // Wait for the window to finish loading
 
var Q = window.Q = Quintus()                // Create a new engine instance
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI") // Load any needed modules
    .setup("game1")                        // Bind Quintus to the canvas with ID "myGame"
    .controls()                             // Add in default controls (keyboard, buttons)
    .touch();                               // Add in touch support (for the UI)
     
    /*
    ... Actual game code goes here ...
    */
    Q.state.set({ scores:0 });

    
    var SPRITE_NONE = 0;
    var SPRITE_RACER = 1;
    var SPRITE_OTHER = 2;
    

    Q.animations('robot', {
        fly_loop: { frames: [13,14,15,16,17,18,19,20], rate: 1/8},
        jump: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12], loop:false,rate: 1/8,next:"fly_loop"},
    });
    
    
    Q.Sprite.extend("Player",{
            init: function(p) {
              this._super(p, {
                  sheet:"robota",
                  sprite:"robot",         
                  type: SPRITE_RACER,
                  collisionMask: SPRITE_OTHER
              });
              this.add('2d,animation,platformerControls');
            },
        
            step: function(dt) {
                if(Q.inputs['up']) {
                  this.play("jump",1);
                }
            },
        
        
        });
    
    Q.Sprite.extend("Girl", {
        init: function(p) {
          this._super(p, { 
              sheet: 'girl',
              type: SPRITE_OTHER,
              collisionMask: SPRITE_OTHER
          });
          this.add('2d');

          this.on("hit.sprite",function(collision) {
              if(collision.obj.isA("Player")) {
                Q.stageScene("endGame",1, { label: "不要自满哦" }); 
                this.destroy();
              }
              else if(collision.obj.isA("Rival")) {
                Q.stageScene("endGame",1, { label: "Game Over" }); 
                this.destroy();
              }
          });
        }
    });
    
    
    //answer button
    Q.UI.AnswButton = Q.UI.Button.extend('UI.AnswButton', {
        init: function(p) {
            this._super(Q._defaults(p, {
                fill: "#FFFFFF",
                border: 2,
                shadow: 3,
                shadowColor: "rgba(0,0,0,0.5)",
                w: 200,
                h: 40
            }),                     
            function() {

                    this.p.answerLabel.p.label = ""+this.p.label;

            }

                        
            );
        },
        
/*                        
            generate1: function() {

 
                this.p.label = "sssss";
            

            }*/
        
    });
    
    //question area
    Q.UI.QuestionArea = Q.UI.Text.extend('UI.QuestionArea', {
        init: function() {
            this._super({
                color: "white",
                x: 0,
                y: 0
            });
        },
        generate: function() {
            
            
            temp = makeUniqueRandom();

   

            $.getJSON("data/wenda.json", function(json){
              datv = json[temp].question;
              datv1 = json[temp].answer1;
              datv2 = json[temp].answer2;
              datv3 = json[temp].answer3;
              datv4 = json[temp].answer4;
              rans = json[temp].right;    
            });
            
            god = rans;
 
            this.p.label = datv;
            

        },
        getAnswer: function() {

/*            $.getJSON("data/wenda.json", function(json){

              rans = json[temp].right;    
            });*/
            
            return rans;
        }


        
    });
    

    
    
    
    Q.load("sprites.png, sprites.json, level_collision.json, level_background.json, tiles.png, robotsheet.png,robotsheet2.png, wenda.json, robotsheet1.png", function() {
        Q.sheet("tiles","tiles.png", { tilew: 32, tileh: 32 });
        Q.sheet("robot","robotsheet.png", { "tilew": 122, "tileh": 158,"sx":0,"sy":0 });
        Q.sheet("robotjump","robotsheet1.png", { "tilew": 148, "tileh": 162,"sx":0,"sy":0 });
        Q.sheet("robota","robotsheet2.png", { "tilew": 148, "tileh": 162,"sx":0,"sy":0 });
        Q.compileSheets("sprites.png","sprites.json");
/*        Q.compileSheets("idle__000.png","sprites1.json");*/
    
        Q.stageScene("level1");
        Q.stageScene("calculations",1);
        //stage our scene here
    });
    
    Q.scene('ui', function(stage){
        score.innerHTML = "您的分数：" + Q.state.get("scores");
        
        tsay.innerHTML = "学海无涯你慢慢走";
         
        Q.state.on("change.scores",this, function() {
            score.innerHTML = "您的分数：" + Q.state.get("scores");
        });
         
/*        Q.state.on("change.lives",this, function() {
            UiLives.innerHTML = "Lives: " + Q.state.get("lives");
        });*/
    });

    Q.scene("level1",function(stage) {
        stage.collisionLayer(new Q.TileLayer({ dataAsset: 'level_collision.json', sheet: 'tiles', type: SPRITE_OTHER }));
        stage.insert(new Q.TileLayer({ dataAsset: 'level_background.json', sheet: 'tiles', type: SPRITE_NONE }));
        
        var player = stage.insert(new Q.Player({x: 160, y: 112,vx:0}));
        player.play("fly_loop");
/*        stage.add("viewport").follow(player);*/
        
        var girl = new Q.Girl({ x: 1200, y: 112, sheet:'girl'});
        stage.insert(girl);

        Q.stageScene("ui",1);
    });
    
    Q.scene('endGame',function(stage) {
      var box = stage.insert(new Q.UI.Container({
        x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
      }));

      var button = box.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                               label: "Play Again" }))         
      var label = box.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                            label: stage.options.label }));
      button.on("click",function() {
        window.location.reload();
      });
      box.fit(20);
    });
    
    Q.scene("calculations",function(stage) {            
        //current question
        var qContainer = stage.insert(new Q.UI.Container({
            fill: "gray",
            x: 621,
            y: 425,
            border: 2,
            shadow: 3,
            shadowColor: "rgba(0,0,0,0.5)",
            w: 340,
            h: 150
            })
        );

        var question = stage.insert(new Q.UI.QuestionArea(),qContainer);    
        question.generate();
        
        
        //teacher say -old version
/*        var tContainer = stage.insert(new Q.UI.Container({
            fill: "gray",
            x: 321,
            y: 225,
            border: 2,
            shadow: 3,
            shadowColor: "rgba(0,0,0,0.5)",
            w: 340,
            h: 150
            })
        );
        
        var tip = stage.insert(new Q.UI.Text({
            label:"",
            color:"white",
            x:0,
            y:0
        }),tContainer);*/
        
         //end of teacher say -old version       
        
        
        
    
        var aContainer = stage.insert(new Q.UI.Container({
            fill: "#438700",
            x: 621,
            y: 495,
            border: 2,
            shadow: 3,
            shadowColor: "rgba(0,0,0,0.5)",
            w: 140,
            h: 50
            })
        );

        var answer = stage.insert(new Q.UI.Text({ 
                label: "",
                color: "white",
                x: 0,
                y: 0
              }),aContainer);
        
        var beixuan1 = stage.insert(new Q.UI.AnswButton({ 
                label: datv1,
                x: 200,
                y: 360,
                answerLabel: answer
              }));
        
        var beixuan2 = stage.insert(new Q.UI.AnswButton({ 
                label: datv2,
                x: 200,
                y: 410,
                answerLabel: answer
              }));
        
        var beixuan3 = stage.insert(new Q.UI.AnswButton({ 
                label: datv3,
                x: 200,
                y: 460,
                answerLabel: answer
              }));
        
        var beixuan4 = stage.insert(new Q.UI.AnswButton({ 
                label: datv4,
                x: 200,
                y: 510,
                answerLabel: answer
              }));

        
        var aButton = stage.insert(new Q.UI.Button({
            fill: "white",
            label: "确定",
            x: 421,
            y: 545,
            border: 2,
            shadow: 3,
            shadowColor: "rgba(0,0,0,0.5)",
            w: 140,
            h: 50
            },
            function() {
                
                var isCorrect = answer.p.label == god;
                
                console.log(rans);
                



                question.generate();

                beixuan1.p.label = datv1;
                beixuan2.p.label = datv2;
                beixuan3.p.label = datv3;
                beixuan4.p.label = datv4;
                


                answer.p.label = '';
/*                tip.p.label = "";*/

                
                var player = Q("Player",0).first();

                if(isCorrect) {                        
                    console.log("sss");
                    

                    player.play("jump");
                    
/*                    tip.p.label = "你开挂了吧,学海无涯你慢慢走";*/
                    
            temp1 = makeUniqueRandom1();

                    $(".bubble").css({"display":"block","background-image":"url(images/right.png)"});
                    
                    setTimeout(
                        function(){$(".bubble").hide();},
                        1500
                    
                    
                    )
   

            $.getJSON("data/tsay.json", function(json){
              talk = json[temp1];    
            });
                    
                    tsay.innerHTML = talk;
                    
                    Q.state.inc("scores",100);

                    
                }
                
                else {
                    
            $(".bubble").css({"display":"block","background-image":"url(images/wrong.png)"});
                    
                    setTimeout(
                        function(){$(".bubble").hide();},
                        1500
                    
                    
                    )
                    
            temp2 = makeUniqueRandom2();

            $.getJSON("data/tsay-false.json", function(json){
              talk1 = json[temp2];    
            });
                    
                    tsay.innerHTML = talk1;
                    
                }
                


                

                
                
            //buttons
                


/*            $.getJSON("data/wenda.json", function(json){

              datv1 = json[temp].answer1;
              datv2 = json[temp].answer2;
              datv3 = json[temp].answer3;
              datv4 = json[temp].answer4;

            });
                
                
            var i;
            for(i=1;i<5;i++) {
                
                var tempvar = eval("datv" + i);
                
                
                (function(i) {
                    stage.insert(
                        new Q.UI.AnswButton({
                            label: tempvar,
                            y: 275+Math.ceil(i/3)*45,
                            x: 30+parseInt((i+2)%3)*45,
                            y: 275+i*45,
                            x: 240,
                            answerLabel: answer
                            }
                        )
                    );
                })(i);
                


            }*/
                
                
            })
        );
        
        
        //buttons
  
        
                console.log(rans);
        
        
    });
    


    


     
});