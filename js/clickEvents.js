$(".blockMenuCommercialItem").click(function() {
    $("#blockMenuCommercial").slideUp();
    if(editObject){
        editObject.userData.type = $(this).data("type");
        editObject.material.color.setHex(hexc($(this).data("color")));
        MIT.updateValue();
        editObject = undefined;
    }
});

$(".blockMenuResidentialItem").click(function() {
    $("#blockMenuResidential").slideUp();
    if(editObject){
        editObject.userData.type = $(this).data("type");
        editObject.material.color.setHex(hexc($(this).data("color")));
        MIT.updateValue();
        editObject = undefined;
    }
});

function onDocumentClick( event ) {
    event.preventDefault();
    if(controls.autoRotate) {
        controls.autoRotate = false;
    }
    $("#blockMenuCommercial, #blockMenuResidential").slideUp();
    if(editObject) {
        var blockTex = new THREE.TextureLoader().load('images/cubemap.png');
        blockTex.wrapS = THREE.RepeatWrapping;
        blockTex.wrapT = THREE.RepeatWrapping;
        var blockMat = new THREE.MeshLambertMaterial({map: blockTex});
        editObject.material = blockMat;
        editObject = undefined;
    }
}

function onDocumentDoubleClick(event) {
    event.preventDefault();

    if(event.button != 0) {
        return;
    }

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    if ( intersects.length > 0 ) {
        var block = intersects[0].object;
        if (block.type) {
            var selector = '#blockMenu' + capitalizeFirstLetter(block.type);
            $(selector).css({top: event.clientY, left: event.clientX}).fadeIn();
            block.material.color.setHex(0x555555);
            editObject = block;
        }
    }
}

function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }

    return '0x' + parts.join('');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
