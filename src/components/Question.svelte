<script>
    export let qnumber;
    export let question; 
    export let answers;
    export let correctAnswer;
    let givenAnswer = ""
    let id = qnumber * Math.random()

    if (givenAnswer == correctAnswer) console.log("correct")
</script>

<div class="card bg-base-200 shadow-xl p-5 flex gap-y-3 ">
    <p class="text-lg font-bold">{qnumber}. {question}</p>
    {#each answers as ans}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="form-control p-1.5">
        <label class="flex flex-row gap-x-2.5 items-center">
        <input type="radio" name="question-{qnumber}" class="radio checked:bg-black-500" value={ans} bind:group={givenAnswer}/>
        <span class="label-text break-words">{ans}</span> 
        </label>
    </div>  
    {/each}
    {#if givenAnswer != ""}
        {#if givenAnswer === correctAnswer}
            <p class="font-bold text-green-600">Correct</p>
        {:else}
            <p class="font-bold text-red-600">Wrong</p>
        {/if}
    {/if}
</div>