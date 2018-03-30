var lowerLeftBoundary;
var upperRightBoundary;
var explosion;
var xMin; 
var xMax; 
var yMin; 
var yMax;
var speed = 10.0f ;
var shot : GameObject;
var shotSpawn : GameObject;
var fireRate = .1f;
var nextFire = -1.0f;

function Awake(){
	explosion = Resources.Load("AsteroidExplosion") ;
	shot = Resources.Load("Laser") ;
	shotSpawn = GameObject.Find("shotSpawn");
	lowerLeftBoundary = GameObject.Find("LowerLeftBoundary");
	upperRightBoundary = GameObject.Find("UpperRightBoundary");
}

function Start(){
	xMin = lowerLeftBoundary.transform.position.x;
	xMax = upperRightBoundary.transform.position.x;
	yMin = lowerLeftBoundary.transform.position.y;
	yMax = upperRightBoundary.transform.position.y;
} 

function Update (){
	if (Time.time > nextFire) {
		nextFire = Time.time + fireRate;
		var laser = Instantiate(shot, shotSpawn.transform.position, shotSpawn.transform.rotation);
		Physics.IgnoreCollision( laser.GetComponent.<Collider>(), gameObject.GetComponent.<Collider>() );
		GetComponent.<AudioSource>().Play ();
	}
	
	var moveHorizontal = Input.GetAxis ("Horizontal");
	var moveVertical = Input.GetAxis ("Vertical");
	var movement = new Vector3 (moveHorizontal, moveVertical, 0.0f );

	GetComponent.<Rigidbody>().velocity = movement * speed;

	transform.position = new Vector3(
		Mathf.Clamp (GetComponent.<Rigidbody>().position.x, xMin, xMax), 
		Mathf.Clamp (GetComponent.<Rigidbody>().position.y, yMin, yMax),
		0.0f 
	);
}

function Die(){   
	Instantiate(explosion, gameObject.transform.position, Quaternion.identity);
	Destroy(gameObject);
	yield WaitForSeconds(3);
	Application.LoadLevel(0);
}
