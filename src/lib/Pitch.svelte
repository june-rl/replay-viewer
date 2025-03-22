<script>
    import { T } from '@threlte/core'
    import {mapSize} from "$lib/values.js";
</script>

<T.Mesh position={[0, 0, 0]}>
    <T.BoxGeometry args={[mapSize.width/1000,mapSize.height/1000,mapSize.length/1000]}  />
    <T.MeshBasicMaterial transparent={true} opacity={0.4} />
</T.Mesh>