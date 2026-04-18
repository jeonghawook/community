import instance from "./interceptor"

export const HotList = async () => {
    try {
        const response = await instance.get(`/stores/hot`)
        console.log(response.data)
        return response.data
    } catch (error) {

    }
}