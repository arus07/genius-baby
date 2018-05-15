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
var questionui = document.getElementById("question");
var al1 = document.getElementById("anslab1");
var al2 = document.getElementById("anslab2");
var al3 = document.getElementById("anslab3");
var al4 = document.getElementById("anslab4");





var uniqueRandoms = [];
var numRandoms = 28;
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
var numRandoms1 = 37;
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
var numRandoms2 = 15;
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

  datv = json[temp].question;
  datv1 = json[temp].answer1;
  datv2 = json[temp].answer2;
  datv3 = json[temp].answer3;
  datv4 = json[temp].answer4;
  rans = json[temp].right;
});

console.log(datv);

$.getJSON("data/tsay.json", function(json){

  talk = json[temp1];

});

$.getJSON("data/tsay-false.json", function(json){

  talk1 = json[temp2];

});



function generate() {

            temp = makeUniqueRandom();

            $.getJSON("data/wenda.json", function(json){
                                console.log(json[temp].question);
              datv = json[temp].question;
              datv1 = json[temp].answer1;
              datv2 = json[temp].answer2;
              datv3 = json[temp].answer3;
              datv4 = json[temp].answer4;
              rans = json[temp].right;    

            });
    

            
            god = rans;
        
            questionui.innerHTML = datv;
            al1.innerHTML = datv1;
            al2.innerHTML = datv2;
            al3.innerHTML = datv3;
            al4.innerHTML = datv4;
            

}



window.addEventListener("load",function() { // Wait for the window to finish loading
 
var Q = window.Q = Quintus()                // Create a new engine instance
    .include("Sprites, Scenes, Anim, Touch") // Load any needed modules "Sprites, Scenes, Input, 2D, Anim, Touch, UI"
    .setup("game1")                        // Bind Quintus to the canvas with ID "myGame"
/*    .controls()   */                          // Add in default controls (keyboard, buttons)
    .touch();                               // Add in touch support (for the UI)
     
    /*
    ... Actual game code goes here ...
    */
    Q.state.set({ scores:0 });

    
    var SPRITE_NONE = 0;
    var SPRITE_RACER = 1;
    var SPRITE_OTHER = 2;
    

    Q.animations('babya', {
/*        fly_loop: { frames: [13,14,15,16,17,18,19,20], rate: 1/8},*/
        cry: { frames: [3,4], rate: 1/2},
        smile:{frames: [5,6], rate: 1/2}
    });
    
    
    Q.Sprite.extend("Player",{
            init: function(p) {
              this._super(p, {
                  sheet:"baby",
                  sprite:"babya",         
              });
              this.add('animation');
            },
        
        
        
        });
    
/*    Q.Sprite.extend("Girl", {
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
    });*/
    
    
    //answer button
/*    Q.UI.AnswButton = Q.UI.Button.extend('UI.AnswButton', {
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
        

        
    });*/
    
    
     //linshi1
    
    
    //question area
/*    Q.UI.QuestionArea = Q.UI.Text.extend('UI.QuestionArea', {
        init: function() {
            this._super({
                color: "white",
                x: 0,
                y: 0
            });
        },

        getAnswer: function() {


            
            return rans;
        }


        
    });*/
    


    
    
    
    Q.load("wenda.json,bg1.jpg,tsay.json,tsay-false.json,babysheet.png", function() {
        Q.sheet("baby","babysheet.png", { "tilew": 65, "tileh": 58,"sx":0,"sy":0 });
/*        Q.sheet("tiles","tiles.png", { tilew: 32, tileh: 32 });
        Q.sheet("robot","robotsheet.png", { "tilew": 122, "tileh": 158,"sx":0,"sy":0 });
        Q.sheet("robotjump","robotsheet1.png", { "tilew": 148, "tileh": 162,"sx":0,"sy":0 });
        Q.sheet("robota","robotsheet2.png", { "tilew": 148, "tileh": 162,"sx":0,"sy":0 });
        Q.compileSheets("sprites.png","sprites.json");*/
/*        Q.compileSheets("idle__000.png","sprites1.json");*/
    
        Q.stageScene("level1");
        Q.stageScene("calculations",1);
        //stage our scene here
    });
    
    Q.scene('ui', function(stage){
/*        score.innerHTML = "您的分数：" + Q.state.get("scores");*/
        
        tsay.innerHTML = "学海无涯你慢慢走";
         
/*        Q.state.on("change.scores",this, function() {
            score.innerHTML = "您的分数：" + Q.state.get("scores");
        });*/
         
/*        Q.state.on("change.lives",this, function() {
            UiLives.innerHTML = "Lives: " + Q.state.get("lives");
        });*/
    });

    Q.scene("level1",function(stage) {
        stage.insert(new Q.Repeater({ asset: "bg1.jpg", speedX: 1, speedY: 1 }));
/*        stage.collisionLayer(new Q.TileLayer({ dataAsset: 'level_collision.json', sheet: 'tiles', type: SPRITE_OTHER }));*/
/*        stage.insert(new Q.TileLayer({ dataAsset: 'level_background.json', sheet: 'tiles', type: SPRITE_NONE }));*/
        
        var player = stage.insert(new Q.Player({x: 260, y: 176}));
/*        player.play("cry");*/
/*        stage.add("viewport").follow(player);*/
        
/*        var girl = new Q.Girl({ x: 1200, y: 112, sheet:'girl'});
        stage.insert(girl);*/

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

        generate();
        
        //current question
 
 

        
        //buttons
        
                console.log(rans);
                console.log(god);
        
        
    });
    
    
    
    $(".bm").click(function () {
        
        console.log(this.innerHTML);
        
        var test = $(this).children().text();
        
        console.log(test);
        
/*        alert(this.innerHTML);*/
                 var isCorrect = test == god;
        
                var player = Q("Player",0).first();
        
                if(isCorrect) {                        

                    
                            temp1 = makeUniqueRandom1();

                            $(".bubble").css({"display":"block","background-image":"url(images/right.png)"});
                    
                            setTimeout(
                                function(){$(".bubble").hide();},
                                500

                            )
                            
                            player.play("smile");
   

                            $.getJSON("data/tsay.json", function(json){
                              talk = json[temp1];    
                            });
                    
                    tsay.innerHTML = talk;
                    
/*                    Q.state.inc("scores",100);*/

                    
                }    else{
                
                        $(".bubble").css({"display":"block","background-image":"url(images/wrong.png)"});

                                setTimeout(
                                    function(){$(".bubble").hide();},
                                    500
                                );
                    
                        player.play("cry");

                        temp2 = makeUniqueRandom2();

                        $.getJSON("data/tsay-false.json", function(json){
                          talk1 = json[temp2];    
                        });

                        tsay.innerHTML = talk1;

                }   

        
                generate();

                al1.innerHTML = datv1;
                al2.innerHTML = datv2;
                al3.innerHTML = datv3;
                al4.innerHTML = datv4;
        


    });


});



  	$(document).ready( function(){
  		
  		//Get the canvas & context
  		var c = $('#game1');
  		var container = $(c).parent();
  		
  		//Run function when browser  resize
	  	$(window).resize( respondCanvas );
	  	
	  	function respondCanvas(){
  			c.attr('width', $(container).width() ); //max width
  			c.attr('height', $(container).height() ); //max height
  			
		}
		
		//Initial call
		respondCanvas();
  	});
  	
  	
  