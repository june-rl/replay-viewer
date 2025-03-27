<script lang="ts">
    import { T } from '@threlte/core'
    import {ballRadius, scaleFactor} from "$lib/values";


    interface Props {
        actorId: number,
        objects: Map<string, Map<string, any>>
    }

    let { actorId, objects }: Props = $props()

    let rigidBodyState = objects.get("TAGame.RBActor_TA:ReplicatedRBState")
    let position = rigidBodyState?.get('RigidBody').location;
    let rotation = rigidBodyState?.get('RigidBody').rotation;

    const hitTeamNum = objects.get("TAGame.Ball_TA:HitTeamNum")?.get("Byte")
    const color = objects.has("TAGame.Ball_TA:HitTeamNum") ? (hitTeamNum == 0 ? "#52617a" : "#7a6352") : "grey" // if no team, grey. if value exists, coloured

    const handleClick = () => {
        console.log(`actor ${actorId} (ball) clicked`)
        console.log(objects)
    }

</script>

{#if rigidBodyState}
    <T.Mesh onclick={handleClick} position={[position.x, position.z, -position.y].map(v => v/scaleFactor)} quaternion={[rotation.x, rotation.z, -rotation.y, rotation.w]}>
        <T.SphereGeometry args={[ballRadius/scaleFactor , 32]}/>
        <T.MeshBasicMaterial color={color}/>
    </T.Mesh>
{/if}