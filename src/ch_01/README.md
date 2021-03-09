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


### fullscreen & resizing

-   first, make the canvas takes all the available space, then make sure it fits if we resize our window and finally, give the user a way to experiment with the experience in fullscreen.
-   use `window.innerWidth` and `window.innerHeight` to make the canvas fit in the viewport.
    
    ```js
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
                }
    ```
-   to resize the canvas, listen to the `resize` event on the window.
    
    ```js
    window.addEventListener('resize', () => {
        console.log('resized!');
                });
    ```
-   we need to update the `sizes` variable, the `camera` aspect ratio, the **projection matrix** and the `renderer`.
    
    ```js
    window.addEventListener('resize', () => {
        // sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        // camera
        cam.aspect = sizes.width / sizes.height;
        // renderer
        renderer.setSize(sizes.width, sizes.height);
                });
    ```
-   the pixel ratio corresponds to how many physical pixels on screens for one pixel unit on the software part.
-   a pixel ratio of `2` means 4x more pixels to render, and so on. ( `3` -> 9x )
-   limit the pixel ratio to `2` using `Math.min()`.
    
    ```js
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    ```
-   use `document.fullscreenElement` to know if we are or not in fullscreen.
-   the method is associated with the element, because we can choose what will be in fullscreen ( the whole page, any DOM element or the `<canvas>` ).
-   [code](sketch_05.js)


### geometries

-   geometries are composed of vertices ( point coordinates in 3D spaces ) and faces ( triangles that join those vertices to create a surface ).
-   we use geometries to create meshes but also to form particles.
-   subdivisions correspond to how much triangles should compose the face.
-   we can use `BufferGeometry` to create our own geometries.
-   to add vertices to a `BufferGeometry` we must start with a `Float32Array`, where we can specify its length and fill it later:
    
    ```js
    const posArray = new Float32Array(9);
    // first vertex
    posArray[0] = 0;
    posArray[1] = 0;
    posArray[2] = 0;
    // second vertex
    posArray[3] = 0;
    posArray[4] = 1;
    posArray[5] = 0;
    // thired vertex
    posArray[6] = 1;
    posArray[7] = 0;
    posArray[8] = 0;
    ```
-   or we can pass an array:
    
    ```js
    const posArray = new Float32Array([
        0, 0, 0, // first vertex
        0, 1, 0, // second vertex
        1, 0, 0, // third vertex
                ]);
    ```
-   the coordinates of the vertices are specified linearly in an one-dimensional array where we specify the `x`, `y` and `z` positions of the first vertex and so on.
-   before we can send that array to the `BufferGeometry`, we have to transform it into a `BufferAttribute`. the first parameter corresponds to our typed array and the second one to how much values make one vertex attribute.
    
    ```js
    const posAttribute = new THREE.BufferAttribute(posArray, 3);
    ```
-   then we add this attribute to our `BufferGeometry` using the `setAttribute( ... )` method. the first parameter being the name of this attribute and the second one the value :
    
    ```js
    geometry.setAttribute('position', posAttribute);
    ```
-   we choose `'position'` because Three.js internal shaders will look for that value to position the vertices; the faces will be automatically created following the order of the vertices.
-   working with `BufferGeometry` allows us to mutualize vertices using the `index` property, resulting in a smaller attribute array and performance improvement.
-   [code](sketch_06.js)


### debug UI
