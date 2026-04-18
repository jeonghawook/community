import instance from "./interceptor"

export const AdminList = async (StoreId) => {
    try {
        console.log(StoreId)
        const response = await instance.get(`/stores/${StoreId}/waitings/list`)
        return response.data
    } catch (error) {
        console.log(`failed getting list from admin`)
    }
}

export const NewWaiting = async (newWaitingDto) => {
    try {
        const response = await instance.post(`/stores/${newWaitingDto.storeId}/waitings`, {
            peopleCnt: parseInt(newWaitingDto.number),
        });
    } catch (error) {
        (error.response.data.statusCode === 409) ?
            alert(error.response.data.message) :
            alert("인원을 선택해 주세요")
    }


}


export const DirectEntering = async (directDTO) => {
    try {
        const response = await instance.post(`/stores/${directDTO.StoreId}/waitings/entered`, {
            peopleCnt: parseInt(directDTO.peopleCnt),
            userId: parseInt(directDTO.userNo)
        })
    } catch (error) {
        console.error('Failed to enter:', error);
    }
}


export const WaitingStatus = async (statusDTO) => {
    try {
        const response = await instance.patch(`/stores/${statusDTO.StoreId}/waitings/${statusDTO.waitingId}?status=${statusDTO.status}`)
        return response.data
    } catch (error) {
        console.error(`failed changing status`, error)
    }
}

