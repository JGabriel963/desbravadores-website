import { db } from "../../../firebase"
import { useParams } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function ShowDbv() {
    const [desbravador, setDesbravador] = useState({})
    const [loadDbv, setLoadDbv] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        async function loadDbv() {
            await getDoc(doc(db, "desbravadores", id))
            .then((spnashot) => {
                
            })
        }

        loadDbv()
    }, [])

    return (
        <div>
            Mostrar Dbv
        </div>
    )
}