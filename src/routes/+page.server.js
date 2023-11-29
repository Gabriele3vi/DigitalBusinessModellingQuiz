export async function load({ fetch }) {
    const response = await fetch('q.json');
    const q = await response.json();
    console.log(q)
    
    //console.log(typeof(questions))
    //for (let a of questions.questions){
    //    console.log(a)
    //}
    return {
      questions: q.questions
    }
  }