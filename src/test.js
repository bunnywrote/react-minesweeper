const { useReducer } = React;

const initialState = {
  value: 0,
  op: '',
  num1: 0,
  num2: '',
  num3: ''
};

const reducer = (state, action) => {
  console.log(state)
  switch (action.type) {
    case "2":
      if (!state.num1) {
        return {...state, num1: state.num2, op: action.payload, num2: ''}
      }
      if(!state.num2) {
        return {...state, op: action.payload}
      }
      if(state.num1 && state.op) {
        console.log('called')
        return {...state, value: eval(state.value+state.op+state.num2), op: action.payload}
      }
      return {...state, value: eval(state.num1+state.op+state.num2), num2: '', op: action.payload, num1: eval(state.num1+state.op+state.num2)}

    case "1":
      if (state.num2 === '' && action.payload==='.') {
        return { ...state, num2: '0'+action.payload }
      } else if (state.num2 === '') {
        return { ...state, num2: action.payload }
      } else {
        if (action.payload === '.' && state.num2.includes('.')){
          return state
        } else {
        return { ...state, num2: state.num2 + action.payload }
        }     
      }
      
    case "3":
      if (state.op && state.num2) {
        return {...state, value: eval(state.num1+state.op+state.num2), num2: '', num1: eval(state.num1+state.op+state.num2), num3 : state.num2}
      } else if (state.op && state.value) {
        return {...state, value: eval(state.value+state.op+state.num3)}
      } else {
        return state
      }
  
    case "c":  
      if (state.num2.length === 2 && state.num2.includes('0.')) {
        return {...state, num2: ''}
      } else if (state.num2.length>1) {
        return {...state, num2: state.num2.slice(0, -1)}
      } else {
        return {...state, num2: ''}
      }
      //state.num2.length > 1 ? return {...state, num2: state.num2.slice(0, -1)} : return {...state, num2:0}

    case "ac":
      return {
        value: 0,
        op: '',
        num1: 0,
        num2: ''
      }
      
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <div className="calculator">
      <div className="container">
        <div className="display">
           {!state.num2 ? state.value : state.num2} 
          <span className="cursor" />
        </div>
        <button className="btn" onClick={() => dispatch({ type: 'ac'})}>AC</button>
        <button className="btn" onClick={() => dispatch({ type: 'c'})}>C</button>
        <button className="btn" onClick={() => dispatch({ type: '2', payload: '*'})}>x</button>
        <button className="btn" onClick={() => dispatch({ type: '2', payload: '/'})}>/</button>
        <button className="btn" onClick={() => dispatch({ type: '1', payload: '7'})}>7</button>
        <button className="btn" onClick={() => dispatch({ type: '1', payload: '8'})}>8</button>
        <button className="btn" onClick={() => dispatch({ type: '1', payload: '9'})}>9</button>
        <button className="btn" onClick={() => dispatch({ type: '2', payload: '+'})}>+</button>
        <button className="btn" onClick={() => dispatch({ type: '1', payload: '4'})}>4</button>
        <button className="btn" onClick={() => dispatch({ type: '1', payload: '5'})}>5</button>
        <button className="btn" onClick={() => dispatch({ type: '1', payload: '6'})}>6</button>
        <button className="btn" onClick={() => dispatch({ type: '2', payload: '-'})}>-</button>
        <button className="btn" onClick={() => dispatch({ type: '1', payload: '1'})}>1</button>
        <button className="btn" onClick={() => dispatch({ type: '1', payload: '2'})}>2</button>
        <button className="btn" onClick={() => dispatch({ type: '1', payload: '3'})}>3</button>
        <button className="btn zero" onClick={() => dispatch({ type: '1', payload: '0'})}>0</button>
        <button className="btn" onClick={() => dispatch({ type: '1', payload: '.'})}>.</button>
        <button className="btn eq" onClick={() => dispatch({ type: '3'})}>=</button>
      </div>
    </div>
  );
};

const ROOT = document.getElementById("app");
ReactDOM.render(<App />, ROOT);
