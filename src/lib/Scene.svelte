<script lang="ts">
    import Pitch from "$lib/Pitch.svelte";
    import { T } from "@threlte/core";
    import {OrbitControls, Grid} from "@threlte/extras";
    import Car from "$lib/Car.svelte";
    import {Replay} from "$lib/Replay.js";
    import Ball from "$lib/Ball.svelte";
    import {getCurrentFrame} from "$lib/state.svelte";

    let { replay }: { replay: Replay } = $props();

    let carActors = $state(new Map());
    let ballActors = $state(new Map());

    $effect(() => {
        replay.executeFrames(getCurrentFrame());
        carActors = replay.findActorsByObjectName("Archetypes.Car.Car_Default")
        ballActors = replay.findActorsByObjectName("Archetypes.Ball.Ball_Default")
    })

    $effect(() => {
        console.log(carActors)
    })

</script>


<T.PerspectiveCamera
        makeDefault
        fov={50}
        position={[10, 5, 10]}
        lookAt.y={0.5}
>
    <OrbitControls enableDamping />
</T.PerspectiveCamera>

<Pitch></Pitch>
<!--<Ball position={{x:0, y:0, z:0}} rotation={{w:0, x:0, y:0, z:0}}></Ball>-->

{#key carActors}
    {#each carActors as [actorId, objectMap]}
        <Car objects={objectMap}></Car>
    {/each}
{/key}

{#key ballActors}
    {#each ballActors as [actorId, objectMap]}
        <Ball
                position={objectMap.get("TAGame.RBActor_TA:ReplicatedRBState")?.get('RigidBody').location}
                rotation={objectMap.get("TAGame.RBActor_TA:ReplicatedRBState")?.get('RigidBody').rotation}
        ></Ball>
    {/each}
{/key}




<Grid
        cellColor="#ffffff"
        sectionColor="#ffffff"
        sectionThickness={0}
/>