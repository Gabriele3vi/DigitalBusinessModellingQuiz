<script>
  import Question from "../components/Question.svelte";
  
  let started = false

  export let data


  let questions = []
  let numRandomQuest = 15

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
  }
</script>


<div class="flex flex-col gap-y-2.5">
  <h1 class="text-5xl font-bold text-center mb-12">
      DBM test simulator
  </h1>
  <div class="flex flex-col gap-y-2.5">
    <h2 class="text-3xl font-bold">Setup</h2>
    <div class="flex flex-row justify-between items-center">
      <label for="qnumber" class="">Choose the number of questions:</label>
      <input name="qnumber" type="number" min="1" max="30" step="1" bind:value={numRandomQuest} class="input input-bordered input-sm w-min max-w-xs" />
    </div>
    <button class="btn" on:click={start_test}>Take the test</button>
  </div>
  <h1 class="text-3xl font-bold">Questions</h1>
  <div class="flex flex-col gap-y-5">
    {#if !started}
    <h3>Questions will be displayed here</h3>
    {:else}
     {#each questions as q (q.qnumber)}
      <Question {...q}/>
     {/each}

    {/if}
  </div>
</div>