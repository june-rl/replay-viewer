<script>
    import { T } from '@threlte/core'
    import {mapSize, scaleFactor} from "$lib/values.js";

    const width = mapSize.width*2/scaleFactor;
    const height = mapSize.height*2/scaleFactor;
    const length = mapSize.length*2/scaleFactor;

</script>

<T.Mesh position={[0, height/2, 0]}>
    <T.BoxGeometry args={[width, height, length]}  />
    <T.MeshBasicMaterial transparent={true} opacity={0.4} />
</T.Mesh>