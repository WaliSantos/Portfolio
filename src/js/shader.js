import * as THREE from 'three';

const 	rendSize 	= new THREE.Vector2();

let     scene,
		camera,
		renderer, 
		delta = 0.01,
		amp = 0.0;

// ******************************************************************** //
// ******************************************************************** //
function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(1.0, 1.0, 1.0));

	rendSize.x = window.innerWidth -20 ;
	rendSize.y = window.innerHeight * 3 ;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 70.0, rendSize.x / rendSize.y, 0.01, 1000.0 );
	camera.position.y = 1.0;
	camera.position.z = 13.0;
	camera.updateProjectionMatrix();

	background();

	requestAnimationFrame(anime);
	render();


}

// ******************************************************************** //
// ******************************************************************** //

function background() {

	const shaderMat = new THREE.ShaderMaterial( 	
	{ 	uniforms  		: 	{	uAmp  	: { type 	: "f" , 
											value  	: 2.0 } 
							},
		vertexShader 	: document.getElementById('VertShader').textContent,
		fragmentShader 	: document.getElementById('FragShader').textContent,
		wireframe  		: true,
		side 			: THREE.DoubleSide
	} );


	const plane	= new THREE.Mesh 	(	new THREE.PlaneGeometry( 40, 40, 70, 70 ), 
									shaderMat
								); 
	plane.name 	= "background";
	scene.add( plane );

	requestAnimationFrame(anime);
}
// ******************************************************************** //
function anime(){
	let obj = scene.getObjectByName("background");

	obj.rotateZ(0.0008);
	obj.updateMatrix();

	obj.material.uniforms.uAmp.value = amp;

	amp += delta;
	if (amp > 2.0 || amp < -2.0)
		delta *= -1.0;
	
	obj.material.uniformsNeedUpdate = true;

	renderer.clear();
	renderer.render(scene, camera);

	requestAnimationFrame(anime);	
}
// ******************************************************************** //
function render(){
	renderer.clear();
	renderer.render(scene, camera);

	requestAnimationFrame(render);
}

// ******************************************************************** //

main();
