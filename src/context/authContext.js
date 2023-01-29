import React, {useState, useEffect, createContext} from 'react';

const AuthContext = createContext();
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {

    let [authState, setAuthState] = useState({
        token: null,
        isAuthenticated: false
    });

    useEffect(() => {
        const getUserInfo = async () => {
            try{
                let token = localStorage.getItem("token");
                if(token) {
                    setAuthState({
                        token,
                        isAuthenticated: true
                    });
                }
            }
            catch(error) {
                console.log(error);

                setAuthState({
                    username: null,
                    userInfo: {},
                    isAuthenticated: false
                });
            }
        }

        getUserInfo();
    }, []);

    const setAuthInfo = ( token) => {
        setAuthState({
            token,
            isAuthenticated: token.length > 1 ? true : false
        });
    }

    return (
        <Provider
            value={{
                authState,
                setAuthState: authInfo => setAuthInfo(authInfo)
            }}
        >
            {children}
        </Provider>
    )
}

export {AuthContext, AuthProvider};