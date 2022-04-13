import { createContext, useReducer } from "react";

const actions = {
    CHANGE_THEME: "CHANGE_THEME"
}

const initState = {
    theme: "dark",
    flipTheme: () => { }
}

const ThemeContext = createContext(initState);

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actions.CHANGE_THEME:
            return {
                ...state,
                theme: action.payload
            }
        default: return state
    }
}

const ThemeProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const flipTheme = () => {
        const newTheme = state.theme === "dark" ? "light" : "dark";
        dispatch({
            type: actions.CHANGE_THEME,
            payload: newTheme
        })
    };

    return <ThemeContext.Provider value={{
        ...state,
        flipTheme,
    }} {...props} />
}

export { ThemeContext, ThemeProvider };
