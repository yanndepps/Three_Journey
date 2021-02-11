# Chapter 01


## Overview :


### basic scene

-   [code](sketch_01.js)


### transform object

-   properties to transform objects in the scene :
    -   `position` ( to move the obj )
    -   `scale` ( resize the obj )
    -   `rotation` ( rotate the obj )
    -   `quaternion` ( rotate the obj )
-   all classes that inherit from the `Object3D` class possess those properties.
-   those properties will be compiled in what we call *matrices*.
-   the `position` property is an instance of the `Vector3` class, not an object.
-   get the length of a vector :
    
    ```js
    console.log(mesh.position.length());
    ```
-   get the distance from another `Vector3` :
    
    ```js
    console.log(mesh.position.distanceTo(camera.position));
    ```
-   we can *normalize* its values (reduce the length of the vector to 1 unit but preserve its direction).
-   use the `set( ... )` method to change values more directly :
    
    ```js
    mesh.position.set(0.7, -0.6, 1);
    ```
-   the axis helper will display 3 lines corresponding to the `x`, `y`, `z` axes
    
    ```js
    const ah = new THREE.AxesHelper(2);
    scene.add(ah);
    ```
-   the `rotation` property is a `Euler`, not a `Vector3`.
-   the value is expressed in **radians**.
-   add an eighth of a complete rotation :
    
    ```js
    mesh.rotation.x = Math.PI * 0.25;
    ```
-   while we rotate one axis we also change the others. ( gimbal lock )
-   we can change the order with the `reorder( ... )` method.
    
    ```js
    object.rotation.reorder('yxz');
    ```
-   the `quaternion` property also expresses a rotation and solves the order problem.
-   the method `lookAt( ... )` lets ask an object to look at smth. the parameter is the target and must be a `Vector3`.
    
    ```js
    camera.lookAt(new THREE.Vector3(0, -1, 0));
    camera.lookAt(mesh.position);
    ```
-   group objects into a container using the `Group` class.
-   [code](sketch_02.js)
