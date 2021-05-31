# Chapter 02 : Classic Techniques


## Overview :


### Lights

-   the `AmbientLight` applies omnidirectional lighting on all geometries.
-   the `DirectionalLight` has a sun-like effect with rays travelling in parallel.
-   the `HemisphereLight` has different colors for both sky and ground.
-   the `PointLight` is like a lighter : the source is infinitely small and the light spreads uniformly in every direction.
-   the `RectAreaLight` is a mix between a directional light and a diffuse light. it only works with `MeshStandardMaterial` and `MeshPhysicalMaterial`.
-   the `SpotLight` is a cone of light starting at a point and oriented in a direction.
-   [code](sketch_01.js)
