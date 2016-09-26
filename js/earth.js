var width = window.innerWidth;
var height = window.innerHeight;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(30, width / height, 1, 1000);
var editObject;

$(function () {
    var webglEl = document.getElementById('webgl');

    if (!Detector.webgl) {
        Detector.addGetWebGLMessage(webglEl);
        return;
    }

    var radius = 90;
    var segments = 32;

    camera.position.x = -30;
    camera.position.y = 30;
    camera.position.z = -30;

    renderer.setSize(width, height);

    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;

    var scene = new THREE.Scene();

    // scene.add(createSky(radius, segments));
    scene.add(createGround());

    var dirLight = new THREE.DirectionalLight(0xccffff, 0.7);
    dirLight.position.set(300, 400, 50);
    dirLight.position.multiplyScalar(1.3);
    dirLight.shadow.camera.near = true;
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 512;
    dirLight.shadow.mapSize.height = 512;
    var d = 200;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.camera.top = d;

    dirLight.shadow.camera.far = 1000;

    scene.add(dirLight);

    var hemLight = new THREE.HemisphereLight(0xeeffee, 0x665555, 1);
    scene.add(hemLight);

                            //L   H   W        X     Y      Z
    // first level
    scene.add( createBlock( 3,  5,  3,       0,    -0.5,     1) );
    scene.add( createBlock( 3,  5,  3,       0,    -0.5,    -2) );
    scene.add( createBlock( 3,  5,  3,       0,    -0.5,    -5) );
    scene.add( createBlock( 3,  5,  3,     -12,    -0.5,     1) );
    scene.add( createBlock( 3,  5,  3,     -12,    -0.5,    -2) );
    scene.add( createBlock( 3,  5,  3,     -12,    -0.5,    -5) );
    scene.add( createBlock(15,  5,  3,      -6,    -0.5,     4) );
    scene.add( createBlock(15,  5,  3,      -6,    -0.5,    -8) );

    // second level
    scene.add( createBlock( 3, 4, 6,        0,   4.25,   -0.5, 'residential') );
    scene.add( createBlock( 3, 4, 6,        0,   4.25,   -6.5, 'residential') );
    scene.add( createBlock( 3, 4, 6,      -12,   4.25,    2.5, 'residential') );
    scene.add( createBlock( 3, 4, 6,      -12,   4.25,   -3.5, 'residential') );
    scene.add( createBlock( 6, 4, 3,     -1.5,   4.25,      4, 'residential') );
    scene.add( createBlock( 6, 4, 3,     -7.5,   4.25,      4, 'residential') );
    scene.add( createBlock( 6, 4, 3,     -4.5,   4.25,     -8, 'residential') );
    scene.add( createBlock( 6, 4, 3,    -10.5,   4.25,     -8, 'residential') );


    // add neighboring houses
    // bottom right
    scene.add( createBlock(  15, 8, 10,     -13,    0,       22, 'neighboring') );
    scene.add( createBlock(  10, 8, 10,      12,    0,       25, 'neighboring') );
    scene.add( createBlock(  10, 8, 20,      15,    0,        5, 'neighboring') );
    scene.add( createBlock(  10, 8, 10,      20,    0,      -22, 'neighboring') );
    scene.add( createBlock(  25, 8, 10,      -5,    0,      -23, 'neighboring') );
    scene.add( createBlock(  10, 8, 10,     -27,    0,      -17, 'neighboring') );
    scene.add( createBlock(  10, 8, 15,     -28,    0,      5.5, 'neighboring') );
    scene.add( createBlock(  10, 8, 10,     -30,    0,      22, 'neighboring') );

    // controls
    controls = new THREE.OrbitControls( camera );

	document.addEventListener( 'dblclick', onDocumentDoubleClick, false );
    document.addEventListener( 'click', onDocumentClick, false );
    window.addEventListener( 'resize', onWindowResize, false );

    webglEl.appendChild(renderer.domElement);
    window.scene = scene;

    render();

    // end init

    // define functions below

    function render() {
        controls.update();
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function createGround() {
        var texture = new THREE.TextureLoader().load('images/floor.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        var groundGeo = new THREE.PlaneGeometry(100, 100, segments, segments);
        var groundMat = new THREE.MeshPhongMaterial({ map:texture });

        var ground = new THREE.Mesh(groundGeo,groundMat);
        ground.position.y = -3;
        ground.rotation.x = -Math.PI/2;
        ground.doubleSided = true;
        ground.receiveShadow = true;

        return ground;
    }

    function createBlock(l,w,h,x,y,z, type='commercial') {
        switch (type) {
            case 'commercial':
            case 'residential':
            {
                var blockTex = new THREE.TextureLoader().load('images/cubemap.png');
                blockTex.wrapS = THREE.RepeatWrapping;
                blockTex.wrapT = THREE.RepeatWrapping;
                var blockMat = new THREE.MeshLambertMaterial({map: blockTex});
                break;
            }
            case 'neighboring':
            default:
            {
                var blockMat = new THREE.MeshLambertMaterial({color: 0x552B2B});
            }
        }

        var blockGeo = new THREE.BoxGeometry(l, w, h, segments, segments, segments);
        var block = new THREE.Mesh(blockGeo,blockMat);

        block.position.y = y;
        block.position.x = x;
        block.position.z = z;
        block.castShadow = true;

        // TODO
        block.name = type === 'commercial' ? 'MainBlock' : 'OtherBlock';
        block.type = type;
        block.commercial = type === 'commercial';
        block.residential = type === 'residential';
        block.multiplier = l === 15 ? 3 : 1;

        return block;
    }

    function createSky(radius, segments) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, segments),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('images/skybox1.png'),
                side: THREE.BackSide
            })
        );
    }

    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
}());
