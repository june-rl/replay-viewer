<script lang="ts">
import { T } from '@threlte/core'
import {carHitbox, scaleFactor} from "$lib/values";
import {setFocus} from "$lib/state.svelte";

interface Props {
    actorId: number
    objects: Map<string, Map<string, any>>
}


let { actorId, objects }: Props = $props()


let rigidBodyState = objects.get("TAGame.RBActor_TA:ReplicatedRBState")
let position = rigidBodyState?.get('RigidBody').location;
let rotation = rigidBodyState?.get('RigidBody').rotation;

let color = objects.get("TAGame.Car_TA:TeamPaint")?.get("TeamPaint").team == 0 ? "blue" : "orange";

const handleClick = () => {
    console.log(`actor ${actorId} (car) clicked`)
    console.log(objects)
    setFocus(actorId)
}

</script>

{#if rigidBodyState && !objects.get("Engine.Actor:bHidden")?.get("Boolean")}
    <T.Mesh onclick={handleClick} position={[position.x, position.z, -position.y].map(v => v/scaleFactor)} quaternion={[rotation.x, rotation.z, -rotation.y, rotation.w]}>
        <T.BoxGeometry args={[carHitbox.length, carHitbox.height, carHitbox.width].map( v => 2*v/scaleFactor)}  />
        <T.MeshBasicMaterial color={color} />
    </T.Mesh>
{/if}
