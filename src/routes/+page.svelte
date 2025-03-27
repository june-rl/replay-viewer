<script lang="ts">
    import {Canvas} from "@threlte/core";
    import Scene from "$lib/Scene.svelte";
    import {createReplayFromJSON, Replay} from "$lib/Replay.js";
    import {onMount} from "svelte";
    import {getCurrentFrame, setCurrentFrame} from "$lib/state.svelte";

    let replayFiles: FileList | null = $state(null);
    let replay: Replay | null = $state(null);

    let playing = $state(false);

    setInterval(() => {
        if(playing){
            setCurrentFrame(getCurrentFrame() + 1);
        }
    }, 1000/30)

    let sliderValue = $state(0);

    $effect(() => {
        setCurrentFrame(sliderValue);
    })

    let fileInputValue: string = $state("");

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

    // $effect(() => {
    //     if (replay) {
    //         replay.executeFrames(getCurrentFrame());
    //     }
    // })

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
    <div>
        <span>Frame: {getCurrentFrame()}</span><br>
        <input type="range" min="0" max={replay.networkFrames.length} bind:value={sliderValue} />
        <button onclick={() => setCurrentFrame(getCurrentFrame() - 1)}>Previous</button>
        <button onclick={() => setCurrentFrame(getCurrentFrame() + 1)}>Next</button>

        {#if playing}
            <button onclick={() => playing = false}>Pause</button>
        {:else}
            <button onclick={() => playing = true}>Play</button>
        {/if}


    </div>

{/if}

<Canvas>

    {#if replay}
            <Scene replay={replay}></Scene>
    {/if}
</Canvas>

