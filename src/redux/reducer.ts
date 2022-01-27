import { CalculateAPI } from "./../api/api";
const SET_CALCULATED_ENTROPY = "SET-CALCULATED-ENTROPY";
type InitialStateType = {
    inputValue: string;
    calculatedEntropy: null | number;
};

let initialState: InitialStateType = {
    inputValue: "",
    calculatedEntropy: null,
};

let appReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case SET_CALCULATED_ENTROPY:
            return { ...state, calculatedEntropy: action.entropy };

        default:
            return state;
    }
};

type setCalculatedEntropyType = {
    type: typeof SET_CALCULATED_ENTROPY;
    entropy: number;
};

type ActionTypes = setCalculatedEntropyType;

export const sendMessageThunk = (message: string) => {
    return async (dispatch: any) => {
        let data = await CalculateAPI.sendMessage(message);
            return dispatch(setCalculatedEntropy(data.calculatedEntropy));
    };
};

const setCalculatedEntropy = (entropy: number): setCalculatedEntropyType => {
    return {
        type: SET_CALCULATED_ENTROPY,
        entropy,
    };
};

export { appReducer };
