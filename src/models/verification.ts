import { host } from "./configs";

export const sendCode = async (email: string) => {
    const response = await fetch(`${host}/verification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });
    return response.ok;
};
