# Chapter 01 : Basics


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

-   an essential aspect of every creative project is making debugging easy and tweaking our code.
-   [code](sketch_07.js)


### textures

-   textures are images that cover the surface of our geometries and give them different effects and/or appearance.
-   **color** or **albedo** only takes the pixels of the texture and apply them to the geo.
-   **alpha** is a grayscale image where white is visible and black is not.
-   **height** is a grayscale image that moves the vertices to create relief.
-   **normal** adds small details by luring the light. good for performance as we don&rsquo;t need to subdivide the geo.
-   **ambient occlusion** is a grayscale image that fakes shadow in the surface crevices. it helps to create contrast without being physically accurate.
-   **metalness** is a grayscale iamge that helps to create reflections.
-   **roughness** is a grayscale image that comes with metalness and helps to dissipate the light.
-   **PBR** stands for Physically Based Rendering. techniques that tend to follow real-life directions to get realistic results.
-   we can import the image texture like any JS dependencies:
    
    ```js
    import img from './image.png';
    console.log(img);
    ```
-   we need to create a `Texture` from that image before we can use it:
    
    ```js
    const textLoader = new THREE.TextureLoader();
    const tex = texLoader.load(img);
    ```
-   we can load as many textures as we want with only one `TextureLoader` instance.
-   finally we can mutualize the events with a `LoadingManager`.
    
    ```js
    const loadingManager = new THREE.LoadingManager();
    const texLoader = new THREE.Texture(loadingManager);
    ```
-   we can listen to various events `onStart`, `onLoad`, `onProgress` and `onError`.
    
    ```js
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = () => { console.log( 'loading started' ); }
    ```
-   the `LoadingManager` is very useful if you want to show a loader and hide it only when all the assets are loaded.
-   we can repeat the texture using the `repeat` property, which is a `Vector2` with `x` and `y` properties.
    
    ```js
    const colorTexture = textLoader.load('/textures/door/color.jpg');
    colorTexture.repeat.x = 2;
    colorTexture.repeat.y = 3;
    ```
-   the texture not being set to repeat itself, we may have to update the `wrapS` and `wrapT` properties using the `THREE.RepeatWrapping` constant.
    
    ```js
    colorTexture.wrapS = THREE.RepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;
    ```
-   we can alternate the direction with `THREE.MirroredRepeatWrapping` :
    
    ```js
    colorTexture.wrapS = THREE.MirroredRepeatWrapping;
    ```
-   the `offset` property is also a `Vector2` that will simply offset the UV coordinates :
    
    ```js
    colorTexture.offset.x = 0.5;
    colorTexture.offset.y = 0.5;
    ```
-   we can rotate the texture using the `rotation` property, which is a simple number corresponding to the angle in radians.
-   the `center` property is also a `Vector2` allows us to change the pivot of rotation, that is, the `0, 0` UV coordinates.
    
    ```js
    colorTexture.rotation = Math.PI * 0.25;
    colorTexture.center.x = 0.5;
    colorTexture.center.y = 0.5;
    ```
-   **mip mapping** is a technique that consists of creating half a smaller version of a texture again and again until you get a 1x1 texture. the GPU will choose the most appropriate version of the texture.
-   the minification filter happens when the pixels of a texture are smaller than the the pixels of the render. we can change the minification filter of the texture using the `minFilter` property.
-   only use the mipmaps for the `minFilter` property. using the `THREE.NearestFilter` one do not need the mipmaps which can be deactivated with `generateMipmaps = false`.
    
    ```js
    colorTexture.generateMipmaps = false;
    colorTexture.minFilter = THREE.NearestFilter;
    ```
-   because of mipmapping, our texture width and height must be a power of 2.
-   [code](sketch_08.js)


### materials

-   materials are used to put a color on each visible pixel of the geometries. the algorithms are written in programs called **shaders**.
-   the `map` property applies a texture on the surfce of the geometry:
    
    ```js
    material.map = doorColorTexture;
    ```
-   the `color` property applies a uniform color on the surface of the geometry. we must instantiate a `Color` class when changing a `color` property directly:
    
    ```js
    material.color = new THREE.Color(0xff0000);
    ```
-   the `opacity` property controls the transparency with the `transparent` property set to `true` :
    
    ```js
    material.transparent = true;
    material.opacity = 0.5;
    ```
-   **normals** are information encoded in each vertex that contains the direction of the outside of the face. they can be used to calculate how to illuminate the face or how the environment should reflect or refract on the geometries&rsquo; surface.
-   the `aoMap` property ( ambient occlusion map ) adds shadows where the texture is dark. we must add a second set of UV; we duplicate the `uv` attribute :
    
    ```js
    sphere.geometry.setAttribute(
        'uv2',
        new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
    );
    ```
-   the environment map is like an image of what&rsquo;s surrounding the scene. it adds reflection or refraction to our objects and can also be used as lighting information.
-   cube environment maps are 6 images each corresponding to a side of the environment. we load them with `CubeTextureLoader` and an array of paths. we use them with the `envMap` property of our material :
    
    ```js
    material.envMap = environmentMapTexture;
    ```
-   [code](sketch_09.js)


### 3d text

-   to load our font :
    
    ```js
    const fontLoader = new THREE.FontLoader()
    
    fontLoader.load(
        '/fonts/helvetiker_regular.typeface.json',
        (font) =>
        {
            console.log('loaded')
        }
    )
    ```
-   use of TextGeometry :
    
    ```js
    fontLoader.load(
        '/fonts/helvetiker_regular.typeface.json',
        (font) =>
        {
            const textGeometry = new THREE.TextGeometry(
                'Hello Three.js',
                {
                    font: font,
                    size: 0.5,
                    height: 0.2,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 5
                }
            )
            const textMaterial = new THREE.MeshBasicMaterial()
            const text = new THREE.Mesh(textGeometry, textMaterial)
            scene.add(text)
        }
    )
    ```
-   keep the geom as low as possible by reducing the `curveSegments` and `bevelSegments` props.
-   **frustum culling** uses bounding to calculate if the object is on screen.
-   in order to optimize our code, we can use both the same material and geometry on multiple `Meshes`.
    
    ```js
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
    const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
    
    for(let i = 0; i < 100; i++)
    {
        // ...
    }
    ```
-   [code](sketch_10.js)
