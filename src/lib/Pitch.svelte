<script>
    import { T } from '@threlte/core'
    import {goalSize, mapSize, scaleFactor} from "$lib/values.js";
    import Goal from "$lib/Goal.svelte";
    import {Grid} from "@threlte/extras";

    const width = mapSize.width/scaleFactor;
    const height = mapSize.height/scaleFactor;
    const length = mapSize.length/scaleFactor;

</script>

<T.Mesh position={[0, height/2, 0]}>
    <T.BoxGeometry args={[width, height, length]}  />
    <T.MeshBasicMaterial transparent={true} opacity={0.1} />
</T.Mesh>
<Grid
        cellColor="#ffffff"
        sectionColor="#ffffff"
        sectionThickness={0}
>
    <T.PlaneGeometry args={[mapSize.width, mapSize.length].map(v => v/scaleFactor)}/>
</Grid>

<Goal team="blue" />
<Goal team="orange" />