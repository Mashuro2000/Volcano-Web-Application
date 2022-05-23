export function CheckError(response){
    if (response.status === 200) {
        return response.json();
    } else if(!response.ok) {
        throw Error(response.statusText);
    }
}