type Observer<T> = {
    (t: T): void;
} 

class Action<T>{  
    #events : Array<Observer<T>>;     
  
    constructor(){
        this.#events = new Array<Observer<T>>();
    }
  
    subscribe(observer : Observer<T>){
        this.#events.push(observer)
    }

    unsubscribe(observer : Observer<T>){
        this.#events = this.#events.filter(obs => observer !== obs);
    }

    invoke(t : T){
       for(let i = 0; i < this.#events.length; ++i){
        let event = this.#events[i];
        event(t);
       } 
    }

}

//strings showcase
const listOfNames : Array<string> = new Array<string>;

const newNameAction : Action<string> = new Action<string>;

const onNewNameAddToArray : Observer<string> = (name) => {
    listOfNames.push(name);
    // console.log(listOfNames);
};

const onNewNameLogIt : Observer<string> = (name) => console.log(name); 

newNameAction.subscribe(onNewNameAddToArray);
newNameAction.subscribe(onNewNameLogIt);

function stringsShowcase(){
    newNameAction.invoke("Nikita");
    newNameAction.unsubscribe(onNewNameLogIt);    
    newNameAction.invoke("Dasha");
    newNameAction.invoke("Vova");
}

stringsShowcase();


console.log("------------------------------------------------------------")


//numbers showcase
let score : number = 0;

const addScoreAction : Action<number> = new Action<number>;
const substractScoreAction : Action<number> = new Action<number>;

const onAddScore : Observer<number> = (val) => score += val;  
const onSubtractScore : Observer<number> = (val) => score -= val;

const onScoreLog : Observer<number> = (val) => console.log(score);

addScoreAction.subscribe(onAddScore);
addScoreAction.subscribe(onScoreLog);

substractScoreAction.subscribe(onSubtractScore);
substractScoreAction.subscribe(onScoreLog);


function numbersShowcase(){
    addScoreAction.invoke(5);
    addScoreAction.invoke(3);

    substractScoreAction.invoke(6);
    substractScoreAction.invoke(1);
}

numbersShowcase();
