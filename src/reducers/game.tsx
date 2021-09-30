import {
    GAME_DATA_UPDATE,    
    
    } from "../actions/types";
    
    const game = JSON.parse(sessionStorage.getItem("game_data")!);

    
    const initialState = {
        game: game ? game : [
            {
                squares: Array(9).fill(null),
            },
        ]
       
    };
    
    export default function (state = initialState, action: any) {
        const { type, payload } = action;
    
        switch (type) {
            case GAME_DATA_UPDATE:
                return {
                    ...state,
                    game: payload,
                };

            default:
                return state;
        }
    }
    