using UnityEngine;
using System.Collections;

public class LaserScript : MonoBehaviour {
	
	void Update (){
		GetComponent<Rigidbody>().velocity = transform.forward * 30;
	}

	void OnTriggerEnter( Collider coll ) {
		//hit something, do damage and destroy
		if (coll.gameObject.tag == "Enemy"){
			coll.gameObject.SendMessage("ApplyDamage", 10);
		}
		Destroy(gameObject);
	}
	

}
