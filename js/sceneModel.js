var segments = 32;


var blockTexture = new THREE.TextureLoader().load('images/cubemap.png');
blockTexture.wrapS = THREE.RepeatWrapping;
blockTexture.wrapT = THREE.RepeatWrapping;

var materialTypes = {
    DEFAULT: new THREE.MeshLambertMaterial({map: blockTexture}),
    NEIGHBOR: new THREE.MeshLambertMaterial({color: 0x552B2B}),
    SELECTED: new THREE.MeshLambertMaterial({color: 0x555555}),

    HIGH_END_RESIDENTIAL: new THREE.MeshLambertMaterial({color: 'rgb(155, 69, 33)'}),
    AFFORDABLE: new THREE.MeshLambertMaterial({color: 'rgb(191, 144, 0)'}),
    CONVENIENCE: new THREE.MeshLambertMaterial({color: 'rgb(65, 138, 132)'}),
    GROCERY: new THREE.MeshLambertMaterial({color: 'rgb(155, 69, 33)'}),
    LOCAL: new THREE.MeshLambertMaterial({color: 'rgb(191, 144, 0)'}),
    RESTAURANT: new THREE.MeshLambertMaterial({color: 'rgb(191, 158, 116)'}),
    TOURISM: new THREE.MeshLambertMaterial({color: 'rgb(81, 50, 49)'}),
    ARTISAN: new THREE.MeshLambertMaterial({color: 'rgb(110, 27, 24)'}),
    COMMUNITY: new THREE.MeshLambertMaterial({color: 'rgb(105, 120, 61)'}),
};

var sceneElements = {};

sceneElements.firstFloor = [
    {
        mitId: 'firstFloor-1',
        geometry: { l: 3, h: 5, w: 3, x: 0, y: -0.5, z: 1 },
        options: { type: 'commercial', multiplier: 1, material: 'DEFAULT' }
    },
    {
        mitId: 'firstFloor-2',
        geometry: { l: 3, h: 5, w: 3, x: 0, y: -0.5, z: -2 },
        options: { type: 'commercial', multiplier: 1, material: 'DEFAULT' }
    },
    {
        mitId: 'firstFloor-3',
        geometry: { l: 3, h: 5, w: 3, x: 0, y: -0.5, z: -5 },
        options: { type: 'commercial', multiplier: 1, material: 'DEFAULT' }
    },
    {
        mitId: 'firstFloor-4',
        geometry: { l: 3, h: 5, w: 3, x: -12, y: -0.5, z: 1 },
        options: { type: 'commercial', multiplier: 1, material: 'DEFAULT' }
    },
    {
        mitId: 'firstFloor-5',
        geometry: { l: 3, h: 5, w: 3, x: -12, y: -0.5, z: -2 },
        options: { type: 'commercial', multiplier: 1, material: 'DEFAULT' }
    },
    {
        mitId: 'firstFloor-6',
        geometry: { l: 3, h: 5, w: 3, x: -12, y: -0.5, z: -5 },
        options: { type: 'commercial', multiplier: 1, material: 'DEFAULT' }
    },
    {
        mitId: 'firstFloor-7',
        geometry: { l: 15, h: 5, w: 3, x: -6, y: -0.5, z: 4 },
        options: { type: 'commercial', multiplier: 3, material: 'DEFAULT' }
    },
    {
        mitId: 'firstFloor-8',
        geometry: { l: 15, h: 5, w: 3, x: -6, y: -0.5, z: -8 },
        options: { type: 'commercial', multiplier: 3, material: 'DEFAULT' }
    }
];

sceneElements.secondFloor = [
    {
        mitId: 'secondFloor-1',
        geometry: { l: 3, h: 4, w: 6, x: 0, y: 4.25, z: -0.5 },
        options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
    },
    {
        mitId: 'secondFloor-2',
        geometry: { l: 3, h: 4, w: 6, x: 0, y: 4.25, z: -6.5 },
        options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
    },
    {
        mitId: 'secondFloor-3',
        geometry: { l: 3, h: 4, w: 6, x: -12, y: 4.25, z: 2.5 },
        options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
    },
    {
        mitId: 'secondFloor-4',
        geometry: { l: 3, h: 4, w: 6, x: -12, y: 4.25, z: -3.5 },
        options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
    },
    {
        mitId: 'secondFloor-5',
        geometry: { l: 6, h: 4, w: 3, x: -1.5, y: 4.25, z: 4 },
        options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
    },
    {
        mitId: 'secondFloor-6',
        geometry: { l: 6, h: 4, w: 3, x: -7.5, y: 4.25, z: 4 },
        options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
    },
    {
        mitId: 'secondFloor-7',
        geometry: { l: 6, h: 4, w: 3, x: -4.5, y: 4.25, z: -8 },
        options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
    },
    {
        mitId: 'secondFloor-8',
        geometry: { l: 6, h: 4, w: 3, x: -10.5, y: 4.25, z: -8 },
        options: { type: 'residential', multiplier: 1, material: 'DEFAULT' }
    }
];

sceneElements.neighbors = [
    {
        mitId: 'neighbors-1',
        geometry: { l: 15, h: 8, w: 10, x: -13, y: 0, z: 22 },
        options: { type: 'neighboring', multiplier: 1, material: 'NEIGHBOR' }
    },
    {
        mitId: 'neighbors-2',
        geometry: { l: 10, h: 8, w: 10, x: 12, y: 0, z: 25 },
        options: { type: 'neighboring', multiplier: 1, material: 'NEIGHBOR' }
    },
    {
        mitId: 'neighbors-3',
        geometry: { l: 10, h: 8, w: 20, x: 15, y: 0, z: 5 },
        options: { type: 'neighboring', multiplier: 1, material: 'NEIGHBOR' }
    },
    {
        mitId: 'neighbors-4',
        geometry: { l: 10, h: 8, w: 10, x: 20, y: 0, z: -22 },
        options: { type: 'neighboring', multiplier: 1, material: 'NEIGHBOR' }
    },
    {
        mitId: 'neighbors-5',
        geometry: { l: 25, h: 8, w: 10, x: -5, y: 0, z: -23 },
        options: { type: 'neighboring', multiplier: 1, material: 'NEIGHBOR' }
    },
    {
        mitId: 'neighbors-6',
        geometry: { l: 10, h: 8, w: 10, x: -27, y: 0, z: -17 },
        options: { type: 'neighboring', multiplier: 1, material: 'NEIGHBOR' }
    },
    {
        mitId: 'neighbors-7',
        geometry: { l: 10, h: 8, w: 15, x: -28, y: 0, z: 5.5 },
        options: { type: 'neighboring', multiplier: 1, material: 'NEIGHBOR' }
    },
    {
        mitId: 'neighbors-8',
        geometry: { l: 10, h: 8, w: 10, x: -30, y: 0, z: 22 },
        options: { type: 'neighboring', multiplier: 1, material: 'NEIGHBOR' }
    }
];

StateBuffer.init(sceneElements);

// builds scene from scratch
// very cpu expensive and should be used only when absolutely needed
function buildScene() {
    for (var a = 0; a < scene.children.length; a++) {
        var child = scene.children[a];
        if(child && child.mitId) {
            scene.children.splice(a, 1);
        }
    }
    for (var i = 0; i < sceneElements.firstFloor.length; i++) {
        var element = sceneElements.firstFloor[i];
        addBlock(element);
    }
    for (var j = 0; j < sceneElements.secondFloor.length; j++) {
        var element = sceneElements.secondFloor[j];
        addBlock(element);
    }
    for (var k = 0; k < sceneElements.neighbors.length; k++) {
        var element = sceneElements.neighbors[k];
        addBlock(element);
    }
}

function updateScene(newModel) {
    if(!newModel) return;

    var centralElements = sceneElements.secondFloor.concat(sceneElements.firstFloor);
    var newCentralElements = newModel.secondFloor.concat(newModel.firstFloor);

    for (var j = 0; j < centralElements.length; j++) {
        var element = centralElements[j];
        var elementJson = JSON.stringify(element);

        for (var i = 0; i < newCentralElements.length; i++) {
            var newElement = newCentralElements[i];
            if(element.mitId == newElement.mitId && elementJson != JSON.stringify(newElement)) {
                rebuildElement(newElement);
            }
        }
    }

    sceneElements = newModel;
    MIT.updateValue();
}

function getElement(mitId) {
    var array = sceneElements.firstFloor.concat(sceneElements.secondFloor);
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if(item.mitId === mitId) {
            return item;
        }
    }
}

function rebuildElement(elementData) {
    for (var a = 0; a < scene.children.length; a++) {
        var child = scene.children[a];
        if(child && child.mitId === elementData.mitId) {
            scene.children.splice(a, 1);
        }
    }
    addBlock(elementData);
}

function addBlock(data) {
    var geometry = data.geometry;
    var options = data.options;

    var material = materialTypes[data.type] || materialTypes[options.material];

    var blockGeo = new THREE.BoxGeometry(geometry.l, geometry.h, geometry.w, segments, segments, segments);
    var block = new THREE.Mesh(blockGeo, material);
    block.position.x = geometry.x;
    block.position.y = geometry.y;
    block.position.z = geometry.z;
    block.castShadow = true;

    block.mitId = data.mitId;
    block.type = options.type;

    scene.add(block);
}
