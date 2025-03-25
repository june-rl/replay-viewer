<script lang="ts">
    import {Canvas} from "@threlte/core";
    import Scene from "$lib/Scene.svelte";
    import {createReplayFromJSON, Replay} from "$lib/Replay.js";

    let fileInputValue: string = $state("");
    let replayFiles: FileList | null = $state(null);
    let replay: Replay | null = $state(null);

    $effect(() => {
        if (replayFiles) {
            replayFiles[0].text().then((text) => {
                replay = createReplayFromJSON(JSON.parse(text));
            })
        } else {
            replay = null;
            fileInputValue = "";
        }
    })

</script>


<input bind:files={replayFiles} bind:value={fileInputValue} type="file"/>
<button onclick={() => replayFiles = null}>Clear</button>


<Canvas>
    {#if replay}
        <Scene></Scene>
    {/if}
</Canvas>

