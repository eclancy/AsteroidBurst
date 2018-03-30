
var health = 100;
private var explosion;

function Awake(){
	explosion = Resources.Load("AsteroidExplosion") ;
	
}

function Update(){
 	
}

function ApplyDamage (damage : int) {
     health -= damage;
 
     if(health <= 0) {
        Die();
     }
}

 function Die(){   
   Instantiate(explosion, gameObject.transform.position, Quaternion.identity);
   Destroy(gameObject);
 }

 
function OnGUI(){

 
} 





