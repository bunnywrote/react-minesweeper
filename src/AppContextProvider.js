import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext()

// export const useAppContext = useContext(AppContext)
const DispatchTypes = Object.freeze({
    REVEAL: Symbol("reveal"),
    SETFLAG: Symbol("set_flag"),
    UNSETFLAG: Symbol("unset_flag")
});

const reducer = (state, action) => {
    console.log('state:')
    console.log(state)
    console.log('action:')
    console.log(action)

    switch(action.type){
        case DispatchTypes.REVEAL:
            console.log('reveal');
            return {...state, cells: [action.cell]}
        case DispatchTypes.SETFLAG:
            console.log('set flag');
            break;
        case DispatchTypes.UNSETFLAG:
            console.log('unset flag');
            break;
        default:
            console.error('this dispatch type is undefined:\t' + action.type)
    }
}

const AppContextProvider = () => {

    const initialState = {
        gameState: 'run',
        minesAmount: 10,
        boardSize: 10,
        cells: [
            {x: 1, y: 0, state: 'close'},
            {x: 1, y: 1, state: 'close'},
        ]
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AppContext.Provider
            value={{
                state: state,
                dispatch: dispatch,
            }}
        >
            <button className="btn" onClick={() => {
                console.log(state)
                return dispatch({ type: DispatchTypes.REVEAL, cell: {x: 1, y: 1, state: 'open'}})
            }}>Test</button>
        </AppContext.Provider>
    );
};

export default AppContextProvider;