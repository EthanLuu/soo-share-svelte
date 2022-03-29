import { host } from "./configs";

export const getAllReports = async () => {
    const response = await fetch(`${host}/reports`, {
        method: "GET"
    });
    const data = await response.json();
    return data;
};

export const deleteReportById = async (id: string) => {
    const response = await fetch(`${host}/reports/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    return data;
}