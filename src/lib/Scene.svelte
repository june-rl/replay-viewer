<script lang="ts">
    import Pitch from "$lib/Pitch.svelte";
    import { T } from "@threlte/core";
    import {OrbitControls, Grid} from "@threlte/extras";
    import Actor from "$lib/Actor.svelte";
    import {Replay} from "$lib/Replay.js";
    import Ball from "$lib/Ball.svelte";


    let { replay }: { replay: Replay } = $props();

    const replicatedRBStateId = $derived(replay.getObjectIdFromName("TAGame.RBActor_TA:ReplicatedRBState"));
    const carDefaultId = $derived(replay.getObjectIdFromName("Archetypes.Car.Car_Default"));
    const ballDefaultId = $derived(replay.getObjectIdFromName("Archetypes.Ball.Ball_Default"));


    const carActors = $derived(replay.findActorsByObjectId(carDefaultId));
    const ballActors = $derived(replay.findActorsByObjectId(ballDefaultId));

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


{#each carActors as [actorId, objectMap]}
    <Actor
            position={objectMap.get(replicatedRBStateId)?.get('RigidBody').location}
            rotation={objectMap.get(replicatedRBStateId)?.get('RigidBody').rotation}
    ></Actor>
{/each}

{#each ballActors as [actorId, objectMap]}
    <Ball
            position={objectMap.get(replicatedRBStateId)?.get('RigidBody').location}
            rotation={objectMap.get(replicatedRBStateId)?.get('RigidBody').rotation}
    ></Ball>
{/each}


<Grid
        cellColor="#ffffff"
        sectionColor="#ffffff"
        sectionThickness={0}
/>