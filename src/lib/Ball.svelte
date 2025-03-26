<script lang="ts">
    import { T } from '@threlte/core'
    import {ballRadius, carHitbox} from "$lib/values";
    const scaleFactor = 500

    interface Props {
        position: {x: number, y: number, z: number},
        rotation: {w: number, x: number, y: number, z: number}
    }

    let { position, rotation }: Props = $props()

</script>

<T.Mesh position={[position.x, position.z, position.y]} quaternion={[rotation.x, rotation.z, rotation.y, rotation.w]}>
    <T.SphereGeometry args={[ballRadius/scaleFactor , 32]}/>
    <T.MeshBasicMaterial />
</T.Mesh>