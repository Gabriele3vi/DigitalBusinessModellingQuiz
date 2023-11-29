<script>
  import Question from "../components/Question.svelte";
  
  let started = false

  export let data

  let questions = []
  let numRandomQuest = 30
  let buttonMsg = "Take the test"
  let maxQ = 215
  let minQ = 1
  let errorMsg = ""


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
    
    if ((maxQ - minQ +1) < numRandomQuest) {
      errorMsg = "Range size must be bigger than the number of questions"
      return
    }

    if (minQ < 0 || maxQ > 215) {
      errorMsg = "Insert a valid range [1, 215]"
      return
    }

    errorMsg = ""
    let nums = getRandomIntSet(numRandomQuest, minQ - 1, maxQ - 1)

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
  <div class="flex flex-col gap-y-2">
    <h2 class="text-3xl font-bold">Setup</h2>
    <div class="flex flex-row justify-between items-center">
      <label for="qnumber" class="">Choose the number of questions:</label>
      <input name="qnumber" type="number" min="1" max="30" step="1" bind:value={numRandomQuest} class="input input-bordered input-sm w-min max-w-xs" />
    </div>
    <div class="divider m-0">and</div>
    <div class="flex flex-row justify-between items-center">
      <label for="qmin" class="">Choose the range:*</label>
      <div class="flex flex-row gap-x-1.5">
        <input name="qmin" type="number" min="1" max="215" step="1" bind:value={minQ} class="input input-bordered input-sm w-min max-w-xs" />
        <p>-</p>
        <input name="qmin" type="number" min="1" max="215" step="1" bind:value={maxQ} class="input input-bordered input-sm w-min max-w-xs" />
      </div>
    </div>

    <button class="btn" on:click={start_test}> 
      {#if started}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg> 
      {/if}
      {buttonMsg} 
    </button>
    <p class="text-sm text-red-600 font-bold">{errorMsg}</p>
    <p class="text-sm font-bold">*Questions have the same numbers as the file.</p>
    <p class="text-sm font-bold">NB: answers may be wrong. If you find one, please send it in the whatsapp group</p>

  </div>
  <h1 class="text-3xl font-bold">Test</h1>
  <div class="flex flex-col gap-y-5">
    {#if !started}
    <h3 class="text-center italic">Click the button to get {numRandomQuest} random questions between n.{minQ} and n.{maxQ}</h3>
    
    {:else}
    <!-- q.number * Math.random() is needed to force svelte to not recycle components-->
     {#each questions as q (q.qnumber * Math.random())}
      <Question {...q}/>
     {/each}
    {/if}
  </div>
</div>