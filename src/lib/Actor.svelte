<script lang="ts">
import { T } from '@threlte/core'
import {carHitbox} from "$lib/values";
const scaleFactor = 500

interface Props {
    position: {x: number, y: number, z: number},
    rotation: {w: number, x: number, y: number, z: number}
}

let { position, rotation }: Props = $props()

</script>

<T.Mesh position={[position.x, position.z, position.y].map(v => v/scaleFactor)} quaternion={[rotation.x, rotation.z, rotation.y, rotation.w]}>
    <T.BoxGeometry args={[carHitbox.width, carHitbox.height, carHitbox.length].map( v => 2*v/scaleFactor)}  />
    <T.MeshBasicMaterial />
</T.Mesh>