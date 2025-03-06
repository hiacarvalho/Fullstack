import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This note is note saved to server',
        important: true
    }
    return request.then(response => response.data.concat(nonExisting))
}

const create = NewObject => {
    const request = axios.post(baseUrl, NewObject)
    return request.then(response => response.data)
}

const update = (id, NewObject) => {
    const request = axios.put(`${baseUrl}/${id}`, NewObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }