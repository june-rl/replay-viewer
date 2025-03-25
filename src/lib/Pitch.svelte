<script>
    import { T } from '@threlte/core'
    import {mapSize, scaleFactor} from "$lib/values.js";

    const width = mapSize.width/scaleFactor;
    const height = mapSize.height/scaleFactor;
    const length = mapSize.length/scaleFactor;

</script>

<T.Mesh position={[0, height/2, 0]}>
    <T.BoxGeometry args={[width, height, length]}  />
    <T.MeshBasicMaterial transparent={true} opacity={0.4} />
</T.Mesh>