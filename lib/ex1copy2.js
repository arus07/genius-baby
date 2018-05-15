var datv;
var datv1;
var datv2;
var datv3;
var datv4;
var rans;
var great;

var temp = Math.floor(Math.random()*4);



$.getJSON("data/wenda.json", function(json){
/*  alert("JSON Data: " + json[0].answer);*/
  datv = json[temp].question;
  datv1 = json[temp].answer1;
  datv2 = json[temp].answer2;
  datv3 = json[temp].answer3;
  datv4 = json[temp].answer4;
  rans = json[temp].right;
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
    Q.state.set({ operations_min: 0, operations_max: 10 });
    
    var SPRITE_NONE = 0;
    var SPRITE_RACER = 1;
    var SPRITE_OTHER = 2;
    

    Q.animations('robot', {
        fly_loop: { frames: [0,1,2,3,4,5,6,7], rate: 1/8},

    });
    
    
    Q.Sprite.extend("Player",{
            init: function(p) {
              this._super(p, {
                  sheet:"robot",
                  sprite:"robot",
/*                  asset:"idle__000.png",    */             
                  type: SPRITE_RACER,
                  collisionMask: SPRITE_OTHER
              });
              this.add('2d,animation');
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
        generate1: function() {
            Q.UI.AnswButton({
                label:"1"
            })
            
        }
        
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
            this.p.num1 = Math.floor(Math.random() * Q.state.get('operations_max')) + Q.state.get('operations_min');
            this.p.num2 = Math.floor(Math.random() * Q.state.get('operations_max')) + Q.state.get('operations_min');
   
/*            var temp1 = Math.floor(Math.random()*4);

            $.getJSON("data/wenda.json", function(json){
              datv = json[temp1].question;
              datv1 = json[temp1].answer1;
              datv2 = json[temp1].answer2;
              datv3 = json[temp1].answer3;
              datv4 = json[temp1].answer4;
              rans = json[temp1].right;
            });*/
 
            this.p.label = datv;
            

        },
        getAnswer: function() {
            return rans;
        }
    });
    

    
    
    
    Q.load("sprites.png, sprites.json, level_collision.json, level_background.json, tiles.png, robotsheet.png, wenda.json", function() {
        Q.sheet("tiles","tiles.png", { tilew: 32, tileh: 32 });
        Q.sheet("robot","robotsheet.png", { "tilew": 122, "tileh": 158,"sx":0,"sy":0 });
        Q.compileSheets("sprites.png","sprites.json");
/*        Q.compileSheets("idle__000.png","sprites1.json");*/
    
        Q.stageScene("level1");
        Q.stageScene("calculations",1);
        //stage our scene here
    });

    Q.scene("level1",function(stage) {
        stage.collisionLayer(new Q.TileLayer({ dataAsset: 'level_collision.json', sheet: 'tiles', type: SPRITE_OTHER }));
        stage.insert(new Q.TileLayer({ dataAsset: 'level_background.json', sheet: 'tiles', type: SPRITE_NONE }));
        
        var player = stage.insert(new Q.Player({x: 160, y: 112,vx:10}));
        player.play("fly_loop");
        stage.add("viewport").follow(player);
        
        var girl = new Q.Girl({ x: 1200, y: 112, sheet:'girl'});
        stage.insert(girl);

        
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
        
        var aButton = stage.insert(new Q.UI.Button({
            fill: "white",
            label: "确定",
            x: 221,
            y: 445,
            border: 2,
            shadow: 3,
            shadowColor: "rgba(0,0,0,0.5)",
            w: 140,
            h: 50
            },
            function() {
                var isCorrect = answer.p.label == question.getAnswer();
                question.generate();
                answer.p.label = '';
                var player = Q("Player",0).first();

                if(isCorrect) {                        
                    alert("shit");
                }
                else {
                    player.p.vx = Math.max(0, player.p.vx - 5);
                }
            })
        );
        
        
            //buttons
            var i;
            for(i=1;i<5;i++) {
                
                var tempvar = eval("datv" + i);
                
                
                (function(i) {
                    stage.insert(
                        new Q.UI.AnswButton({
                            label: tempvar,
/*                            y: 275+Math.ceil(i/3)*45,
                            x: 30+parseInt((i+2)%3)*45,*/
                            y: 275+i*45,
                            x: 30,
                            answerLabel: answer
                            }
                        )
                    );
                })(i);
                


            }
        
        
    });
    


    


     
});