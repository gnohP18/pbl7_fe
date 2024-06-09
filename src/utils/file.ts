import { API_URL } from "~/constants/config"

export const generateUrlDownloadFile = (name: string) => {
    return `${API_URL}/files/download?name=${name}`
}