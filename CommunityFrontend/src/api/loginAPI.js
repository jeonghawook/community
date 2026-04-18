import instance from './interceptor';
import jwt_decode from 'jwt-decode';


export const Login = async (loginDto) => {
    try {

        const response = await instance.post(`/users/login`, {
            userEmail: loginDto.userEmail,
            password: loginDto.password,
        })

        if (response) {
            const refreshToken = response.data.refreshToken;
            const accessToken = response.data.accessToken;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            const decodedToken = jwt_decode(accessToken);

            const { nickname, email, userId } = decodedToken;

            return ({ email, userId, nickname });
        }

 
    } catch (error) {
        alert(error.response.data.message)
        throw error;
    }
};

export const Logout = async () => {
    try {
        await instance.delete(`/users/logout`);
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const kakaoLogin = async () => {
    try {
      const response = await instance.get('/users/login/kakao')

        if (response) {
            const refreshToken = response.data.refreshToken;
            const accessToken = response.data.accessToken;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            const decodedToken = jwt_decode(accessToken);

            const { nickname, email, userId } = decodedToken;

            return ({ email, userId, nickname });
        }
    } catch (error) {
        console.log(error)
        
    }
}

//유저 탈퇴 , 유저 수정, 유저 비번 수정
