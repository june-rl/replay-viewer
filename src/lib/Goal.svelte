<script lang="ts">
    import { T } from '@threlte/core'
    import {goalSize, mapSize, scaleFactor} from "$lib/values.js";
    import {Grid} from "@threlte/extras";

    const width = goalSize.width/scaleFactor;
    const height = goalSize.height/scaleFactor;
    const depth = goalSize.depth/scaleFactor;

    interface Props {
        team: "blue" | "orange"
    }

    let {team}: Props = $props();

    const z = (mapSize.length/2/scaleFactor + goalSize.depth/2/scaleFactor) * (team === "blue" ? 1 : -1) ;
    const position: [x: number, y: number, z: number] = [0, height/2, z]

</script>

<T.Mesh {position}>
    <T.BoxGeometry args={[width, height, depth]}  />
    <T.MeshBasicMaterial transparent={true} opacity={0.2} color={team} />
</T.Mesh>

<Grid
        cellColor="#ffffff"
        sectionColor="#ffffff"
        sectionThickness={0}
        position={[0,0,z]}
>
    <T.PlaneGeometry args={[width, depth]}/>
</Grid>