

var health = 100;
var energy : double = 100;
var recoveryRate  = 20;
var GlobalHandler : GameObject;
var GlobalHandlerScript : MonoBehaviour;
var controllerScript : MonoBehaviour;
var size : Vector2 = new Vector2(60,20);
var healthBarEmpty : Texture2D;
var healthBarFull : Texture2D;
var energyBarFull : Texture2D;

private var damageDelay = .5;
private var lastDamage = -10.0;

var stunned = false;
var onFire = false;

var burnDuration = 0;
var burnDamage = 0;

var stunDuration = 0;


function Awake(){
  GlobalHandler = GameObject.Find("GlobalHandler");
  GlobalHandlerScript = GlobalHandler.GetComponent("GlobalHandler");
  controllerScript = gameObject.GetComponent("ControllerScript");
  healthBarEmpty = Resources.Load("BarEmpty");
  healthBarFull = Resources.Load("HealthBarFull");
  energyBarFull = Resources.Load("EnergyBarFull");
}

function changeSpeed( percent ){
	controllerScript.SendMessage("setActiveSpeed", percent );
}

function slide(){
	controllerScript.SendMessage("preventMoveUpdate");
}


 
 function Update(){
 
 	//burning damage
 	if(burnDuration > 0){
 		if(Time.time > damageDelay+lastDamage){ //if a half second has passed
        	ApplyDamage(burnDamage);
        	lastDamage = Time.time;
        	burnDuration-=.5;
    	}
 	}else if(onFire == true){
 		var fireSprite = transform.Find("OnFire(Clone)");
 		Destroy(fireSprite.gameObject);
 		onFire = false;
 	}
 	
 	
 	
 	
 	if(stunDuration > 0){
 		controllerScript.enabled = false;
        stunDuration -= Time.deltaTime;
 	}else if(controllerScript){
 		 controllerScript.enabled = true;
 	}
 
 
 	if (burnDuration <= 0){
    	burnDuration = 0;
    	
    }
    
    if (stunDuration < 0){
    	stunDuration = 0;
    }
    
    	
	if(energy<100){
		recovered = recoveryRate * Time.deltaTime;
		energy += recovered;
		
		if(energy>100){
			energy = 100;
		}
	}
 }
 
 
function ApplyDamage (damage : int) {
     health -= damage;
 
     if(health <= 0) {
     	GlobalHandlerScript.kill(name);
        Die();
     }
 }
 
 //*******************************UTILITIES*********************************
 
 function DepleteEnergy( energyUse : int) {
 
     if(energy >= energyUse) {
		energy -= energyUse;
        return true;
     }
     else{
     	return false;
     }
 }
 
 function stun( stunTime : int){
 	stunDuration = stunTime;
 }
 
 
 //set damage for burn
 function setFire( args ){
 	burnDuration = args[0];
 	burnDamage = args[1];
 	onFire = true;
 }
 
 
 function Die(){
   //Die and or Respawn
   Destroy(gameObject);
 }

 
function OnGUI()
{

	var screenPos : Vector3 = Camera.main.WorldToScreenPoint (transform.position);
 	screenPos.y = Screen.height - screenPos.y - 60;
 	screenPos.x -= 27;
    // draw the background:
    GUI.BeginGroup (new Rect (screenPos.x, screenPos.y, size.x, size.y));
    
    	//draw the empty part
        GUI.Box (Rect (0, 0, size.x, size.y/2), healthBarEmpty);
        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, (size.x * health) / 100, size.y));
            GUI.Box (Rect (0,0, size.x, size.y), healthBarFull);
        GUI.EndGroup ();
        
        //draw the empty part
        GUI.Box (Rect (0,8, size.x, size.y/2), healthBarEmpty);
        //draw the filled in part
        GUI.BeginGroup (new Rect (0, 0, (size.x * energy) / 100, size.y));
            GUI.Box (Rect (0, 8, size.x, size.y), energyBarFull);
        GUI.EndGroup ();
 
    GUI.EndGroup ();
 
} 

function getOnFire(){
	return onFire;
}





