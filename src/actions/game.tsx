import {
    GAME_DATA_UPDATE,

} from "./types";


export const gameUpdate = (data: any) => async (dispatch: any) => {

    sessionStorage.setItem("game_data", JSON.stringify(data));

    return  dispatch({
        type: GAME_DATA_UPDATE,
        payload: data,
    });
  
}
