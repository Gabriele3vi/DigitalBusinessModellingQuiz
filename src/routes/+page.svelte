<script>
  import Question from "../components/Question.svelte";
  
  let started = false

  export let data


  let questions = []
  let numRandomQuest = 15
  let buttonMsg = "Take the test"

  //questo metodo ritorna una lista di interi random diversi di lunghezza data nel range [min, max]
  function getRandomIntSet(size, min, max){
    let nums = []

    let counter = 0

    while (counter < size) {
      let n = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!nums.includes(n)){
        nums.push(n)
        counter++;
      }
    }

    return nums
  }
  
  function start_test() {
    questions = []
    let nums = getRandomIntSet(numRandomQuest, 0, data.questions.length - 1)

    for (let n of nums) {
      questions.push(data.questions[n])
    }
    started = true
    buttonMsg = "Change questions"
  }
</script>


<div class="flex flex-col gap-y-2.5 h-full">
  <h1 class="text-5xl font-bold text-center my-10">
      DBM test simulator
  </h1>
  <div class="flex flex-col gap-y-2.5">
    <h2 class="text-3xl font-bold">Setup</h2>
    <div class="flex flex-row justify-between items-center">
      <label for="qnumber" class="">Choose the number of questions:</label>
      <input name="qnumber" type="number" min="1" max="30" step="1" bind:value={numRandomQuest} class="input input-bordered input-sm w-min max-w-xs" />
    </div>
    <p class="text-sm"><span class="font-bold">NB:</span> anwers can be wrong</p>
    <button class="btn" on:click={start_test}> 
      {#if started}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg> 
      {/if}
      {buttonMsg} 
    </button>
  </div>
  <h1 class="text-3xl font-bold">Questions</h1>
  <div class="flex flex-col gap-y-5">
    {#if !started}
    <h3 class="text-center">Click the button to generate some questions</h3>
    {:else}
     {#each questions as q (q.qnumber)}
      <Question {...q}/>
     {/each}
    {/if}
  </div>
</div>