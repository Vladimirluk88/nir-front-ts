import axios from "axios"

export const CalculateAPI = {
    sendMessage: (message: string) => {
        return axios.get("https://express-template-test.herokuapp.com/?message=" + message).then(response => {
            return response.data
        });
    }
}