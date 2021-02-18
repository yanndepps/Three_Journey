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


### animations

-   we want to execute a function that will move objects and do the render on each frame regardless of the frame rate.
-   the native JS way of doing it the `window.requestAnimationFrame( ... )` method.
-   `requestAnimationFrame` will execute the function provided **on the next frame**.
-   to adapt the animation to the framerate, we need to know how much time elapsed.
-   use `Date.now()` to get the current timestamp:
    
    ```js
    const time = Date.now();
    ```
-   the timestamp corresponds to how much time has passed since the 1st of January 1970 ( Unix ); units in milliseconds.
-   the deltaTime should be arond `16` if our screen is running at `60fps`.
-   a built-in solution in Three.js is `Clock`, it will handle time calculations.
-   [code](sketch_03.js)


### cameras

-   the `Camera` class is called an **abstract** class. we inherit from it to have access to common properties and methods.
-   the **field of view** corresponds to our camera view&rsquo;s vertical amplitude angle in degrees. a small angle will end up with a long scope effect, and a wide angle with a fish eye effect.
-   the **aspect ratio** correspond to the width divided by the height.
-   the **near** and **far** parameters correspond to how close and how far the camera can see; any object or part of closer to the cam than the `near` value or further than the `far` one will not show.
-   [code](sketch_04.js)
