<script lang="ts">

    // DO NOT USE - NOT PERFORMANT

    import type {Replay} from "$lib/Replay";
    import {getCurrentFrame} from "$lib/state.svelte";

    interface Props {
        replay: Replay
    }
    const { replay }: Props = $props();

    type Player = {
        name: string,
        boost: number
    }
    let players: Map<number, Player> = $state(new Map());

    $effect(() => {
        getCurrentFrame();
        let vehicleActors = replay.findActorsByObjectName("Archetypes.Car.Car_Default");
        let boostActors = replay.findActorsByObjectName("Archetypes.CarComponents.CarComponent_Boost");
        let PRIActors = replay.findActorsByObjectName("TAGame.Default__PRI_TA");

        for (let [actorId, objects] of PRIActors) {

            let vehicleActorId = [...vehicleActors].filter(([key, value]) => value.get("Engine.Pawn:PlayerReplicationInfo")?.get("ActiveActor").actor === actorId)[0][0];
            let boostActor = [...boostActors].filter(([key, value]) => value.get("TAGame.CarComponent_TA:Vehicle")?.get("ActiveActor").actor === vehicleActorId)[0][1];

            players.set(actorId, {
                name: objects.get("Engine.PlayerReplicationInfo:PlayerName")?.get("String"),
                boost: Math.floor(100 * boostActor.get("TAGame.CarComponent_Boost_TA:ReplicatedBoost")?.get("ReplicatedBoost").boost_amount / 255) ,
            });
        }

    })

</script>

<div>
    {#key getCurrentFrame()}
        {#each players as [actorId, player]}
            <div>
                <span>{player.name}: {player.boost}</span>
            </div>
        {/each}
    {/key}
</div>