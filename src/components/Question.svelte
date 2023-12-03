<script>
    import { shuffle } from "../lib/utils"
    export let qnumber;
    export let question; 
    export let answers;
    export let correctAnswer;

    let givenAnswer = ""
    answers = shuffle(answers)

    if (givenAnswer == correctAnswer) console.log("correct")
    let showCorrect = false
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
        <div class="flex md:flex-row flex-col md:justify-between items-center p-1 w-full gap-y-2 md:gap-x-5">
            {#if givenAnswer.toLowerCase() === correctAnswer.toLowerCase()}
            <p class="font-bold text-green-600">Correct</p>
            {:else}
            <p class="font-bold text-red-600">Wrong</p>
                {#if showCorrect}
                <p class="p-1.5 rounded-md bg-base-300 italic md:text-right max-w-1/2">{correctAnswer}</p>
                {:else}
                <button class="btn btn-sm " on:click={() => showCorrect = true}>Show correct answer</button>
                {/if}
            {/if}
        </div>
    {/if}
</div>