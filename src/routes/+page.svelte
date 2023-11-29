<script>
  import Question from "../components/Question.svelte";
  
  let started = false

  export let data

  let questions = []
  let numRandomQuest = data.questions.length / 2


  function getRandomInt(min, max) {
    // The Math.floor() function returns the largest integer less than or equal to a given number.
    // The Math.random() function returns a floating-point, pseudo-random number in the range [0, 1).
    // By multiplying the random number by the range and adding the minimum, we get a random integer in the desired range.
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function start_test() {
    questions = []
    for (let i = 0; i < numRandomQuest; i++) {
      let index = getRandomInt(0, data.questions.length - 1)
      console.log(index)
      console.log(data.questions[index])
      questions.push(data.questions[index])
    }
    console.log(questions)
    started = !started
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
     {#each questions as q}
      <Question {...q}/>
     {/each}

    {/if}
  </div>
</div>