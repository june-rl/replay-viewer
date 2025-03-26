<script lang="ts">
    import {Canvas} from "@threlte/core";
    import Scene from "$lib/Scene.svelte";
    import {createReplayFromJSON, Replay} from "$lib/Replay.js";
    import {onMount} from "svelte";

    let fileInputValue: string = $state("");
    let replayFiles: FileList | null = $state(null);
    let replay: Replay | null = $state(null);

    let currentFrame = $state(0);

    $effect(() => {
        if (fileInputValue === "") {
            replayFiles = null;
            replay = null;
        }
    })

    $effect(() => {
        if (replayFiles) {
            replayFiles[0].text().then((text) => {
                replay = createReplayFromJSON(JSON.parse(text));
            })
        }
    })

    $effect(() => {
        if (replay) {
            replay.executeFrames(currentFrame);
        }
    })

    // onMount(() => {
    //     setInterval(() => {
    //         if (replay) {
    //             currentFrame = (currentFrame + 1) % replay.networkFrames.length;
    //         }
    //     }, 1000/30)
    // })



</script>


<input bind:files={replayFiles} bind:value={fileInputValue} type="file"/>
<button onclick={() => fileInputValue = ""}>Clear</button>

{#if replay}
    <span>Frame: {currentFrame}</span>

        <input type="range" min="0" max={replay.networkFrames.length} bind:value={currentFrame} />
{/if}

<Canvas>

    {#if replay}
        {#key currentFrame}
            <Scene replay={replay}></Scene>
        {/key}
    {/if}
</Canvas>

