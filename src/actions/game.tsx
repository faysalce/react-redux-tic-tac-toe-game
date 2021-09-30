import {
    GAME_DATA_UPDATE,

} from "./types";


export const gameUpdate = (data: any) => (dispatch: any) => {

    sessionStorage.setItem("game_data", JSON.stringify(data));

    dispatch({
        type: GAME_DATA_UPDATE,
        payload: data,
    });
    return true
}
