import { auth, db } from "../../firebase";
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadindAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadUser() {
            const storageUser = localStorage.getItem('@diretoraPRO')

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }

            setLoading(false)
        }

        loadUser();

    }, [])

    async function signIn(email, password) {
        setLoadingAuth(true)

        await signInWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid
            console.log(uid)

            const docSnap = await getDoc(doc(db, "users", uid))

            let data = {
                uid: uid,
                name: docSnap.data().name,
                email: value.user.email
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success(`Seja bem-vindo de volta, ${data.name}`)
            navigate("/main")
        })
        .catch((error) => {
            console.log(error)
            setLoadingAuth(false)
            toast.error('Ops, algo deu errado!')
        })
    }
    
    async function singUp(email, password, name) {
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, "users", uid), {
                name: name,
            })
            .then( () => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email
                }


                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success(`Seja bem-vindo, ${name}`)
                navigate("/main")
            })
            .catch ((error) => {
                console.log(error)
                setLoadingAuth(false)
            })
        })
    }

    function storageUser(data) {
        localStorage.setItem('@diretoraPRO', JSON.stringify(data))
    }

    async function logout() {
        await signOut(auth)
        localStorage.removeItem('@diretoraPRO')
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                setUser,
                signIn,
                singUp,
                logout,
                loadindAuth,
                setLoadingAuth,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
