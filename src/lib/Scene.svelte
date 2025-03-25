<script>
    import Pitch from "$lib/Pitch.svelte";
    import { T } from "@threlte/core";
    import {OrbitControls, Grid} from "@threlte/extras";
    import Actor from "$lib/Actor.svelte";
</script>


<T.PerspectiveCamera
        makeDefault
        fov={50}
        position={[10, 5, 10]}
        lookAt.y={0.5}
>
    <OrbitControls enableDamping />
</T.PerspectiveCamera>

<Pitch></Pitch>
<Actor></Actor>

<Grid
        cellColor="#ffffff"
        sectionColor="#ffffff"
        sectionThickness={0}
/>