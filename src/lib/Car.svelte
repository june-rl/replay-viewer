<script lang="ts">
import { T } from '@threlte/core'
import {carHitbox} from "$lib/values";
const scaleFactor = 500

interface Props {
    objects: Map<string, Map<string, any>>
}


let { objects }: Props = $props()

let position = objects.get("TAGame.RBActor_TA:ReplicatedRBState")?.get('RigidBody').location;
let rotation = objects.get("TAGame.RBActor_TA:ReplicatedRBState")?.get('RigidBody').rotation;

let color = objects.get("TAGame.Car_TA:TeamPaint")?.get("TeamPaint").team == 0 ? "blue" : "orange";

</script>

<T.Mesh position={[position.x, position.z, -position.y].map(v => v/scaleFactor)} quaternion={[rotation.x, rotation.z, -rotation.y, rotation.w]}>
    <T.BoxGeometry args={[carHitbox.length, carHitbox.height, carHitbox.width].map( v => 2*v/scaleFactor)}  />
    <T.MeshBasicMaterial color={color} />
</T.Mesh>