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
  let qToSearch = ""
  let errorSearchMsg = ""

  let questionsAnswer = []


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

  function searchQuestions() {
    if (!qToSearch) {
      errorSearchMsg = "Insert a number"
      return
    }
    qToSearch = qToSearch.trim()
    let currentAnswers = []
    let qIndexes = qToSearch.split(",")
    
    for (let i of qIndexes){
      try {
        i = parseInt(i.trim())
      } catch (error) {
        errorSearchMsg = "you didn't insered a number"
        
      }
      
      if (i < 1 || i > 215)
        continue

      currentAnswers.push(data.questions[i - 1])
    }

    if (currentAnswers.length == 0) {
      errorSearchMsg = "Input in wrong. Make sure you insered value between 1 and 215"
      return
    }

    errorSearchMsg = ""
    questionsAnswer = currentAnswers
  }
</script>


<div class="flex flex-col gap-y-2.5 h-full">
  <h1 class="text-5xl font-bold text-center my-10">
      DBM test simulator
  </h1>
  <div class="flex flex-col gap-y-2">
    <div class="flex flex-row gap-x-2.5 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>        
    <h2 class="text-3xl font-bold">Look for specific questions</h2>
    </div>
    <p>Type the number of questions separated by a comma to search specific questions.</p>
    <div class="join">
      <input class="input input-bordered join-item w-full" placeholder="Ex. 4, 8, 15, 16, 23, 42" bind:value={qToSearch}/>
      <button class="btn join-item rounded-r-full" on:click={searchQuestions}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>        
      </button>
    </div>
    <p class="font-bold text-red-600 text-sm">{errorSearchMsg}</p>
    <div class="flex flex-col gap-y-2">
      {#each questionsAnswer as qa}
        <Question {...qa}/>
      {/each}
  </div>
  </div>
  <div class="flex flex-col gap-y-2 mt-2.5">
    <div class="flex flex-row gap-x-2.5 items-center">
      <svg xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" class="w-8 h-8 font-bold" viewBox="0 0 63 32" enable-background="new 0 0 63 32" xml:space="preserve">
        <g id="Page-1" sketch:type="MSPage">
          <g id="Weight" transform="translate(1.000000, 1.000000)" sketch:type="MSLayerGroup">
            <path id="Shape_1_" sketch:type="MSShapeGroup" fill="none" stroke="black" stroke-width="3" stroke-linejoin="round" d="    M10.1,26H6c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h4.1v3V2c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v26c0,1.1-0.9,2-2,2h-4    c-1.1,0-2-0.9-2-2v-5V26z"/>
            <path id="Shape_3_" sketch:type="MSShapeGroup" fill="none" stroke="black" stroke-width="3" stroke-linejoin="round" d="    M52.1,23v5c0,1.1-0.9,2-2,2h-4c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v5V4h3c1.1,0,2,0.9,2,2v18c0,1.1-0.9,2-2,2    h-3V23z"/>
            
              <line id="Rectangle-path_1_" sketch:type="MSShapeGroup" fill="none" stroke="black" stroke-width="3" x1="44" y1="15" x2="18.1" y2="15">
            </line>
            <path id="Shape_2_" sketch:type="MSShapeGroup" fill="none" stroke="black" stroke-width="3" d="M4,15H0.1"/>
            <path id="Shape_6_" sketch:type="MSShapeGroup" fill="none" stroke="black" stroke-width="3" d="M61,15h-3.9"/>
          </g>
        </g>
        </svg> 
    <h1 class="text-3xl font-bold">Simulation</h1>
    </div>
    <p>Make a simulation of the test. You can set the number of questions that will be generated and the range from which they will be taken.</p>
    
    <div class="flex flex-row gap-x-1.5 items-center">
    <p>Is the simulator helpful for you? </p>
    <a class="font-medium italic flex flex-row items-center gap-x-1.5" href="https://www.paypal.com/paypalme/my/settings?flow=cmV0dXJuVXJsPWh0dHBzOi8vd3d3LnBheXBhbC5jb20vbXlhY2NvdW50L3RyYW5zZmVyL2hvbWVwYWdlL3JlcXVlc3QmY2FuY2VsVXJsPWh0dHBzOi8vd3d3LnBheXBhbC5jb20vbXlhY2NvdW50L3RyYW5zZmVyL2hvbWVwYWdlL3JlcXVlc3Q="> Offer me a coffee!
      <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 512 512">
        <path stroke="#0000FF" d="M432 320H400a16 16 0 0 0 -16 16V448H64V128H208a16 16 0 0 0 16-16V80a16 16 0 0 0 -16-16H48A48 48 0 0 0 0 112V464a48 48 0 0 0 48 48H400a48 48 0 0 0 48-48V336A16 16 0 0 0 432 320zM488 0h-128c-21.4 0-32.1 25.9-17 41l35.7 35.7L135 320.4a24 24 0 0 0 0 34L157.7 377a24 24 0 0 0 34 0L435.3 133.3 471 169c15 15 41 4.5 41-17V24A24 24 0 0 0 488 0z"/>
      </svg>
    </a>
    </div>
    <h2 class="text-2xl font-bold">Setup</h2>
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
  <h1 class="text-2xl font-bold">Test</h1>
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