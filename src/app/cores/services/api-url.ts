import { environment } from "../../../environments/environment"; // Use Relative Imports [Not Error Testing]

export const getApiUrl = (endpoint: string) => {
    const url = environment.baseUrlApi + endpoint;
    return url;
}