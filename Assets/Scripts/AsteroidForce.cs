using UnityEngine;
using System.Collections;

public class AsteroidForce : MonoBehaviour{

	void Start (){
		float speed = (Random.value+.01f) * 200 * GetComponent<Rigidbody>().mass;
		//rigidbody.velocity = transform.forward * speed;
		GetComponent<Rigidbody>().AddForce (Vector3.down * speed);
	}

	void Update(){

		GetComponent<Rigidbody>().position = new Vector3(
			transform.position.x, 
			transform.position.y,
			0.0f 
		);

	}
}
