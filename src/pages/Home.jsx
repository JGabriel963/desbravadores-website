import { useEffect, useState } from 'react'
import BoxDash from '../Components/BoxDash'
import { db } from '../../firebase'
import { getDoc, collection, onSnapshot, getDocs } from 'firebase/firestore'
import { toast } from 'react-toastify'

export default function Home() {
    const [desbravadores, setDesbravadores] = useState([])
    const [diretoria, setDiretoria] = useState([])
    const [loadInfoDbv, setLoadInfoDbv] = useState(true)
    const [loadInfoDiretoria, setLoadInfoDiretoria] = useState(true)
    const a = "abacata"

    useEffect(() => {
        async function loadDbv() {
            let listDbv = []

            await getDocs(collection(db, "desbravadores"))
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    listDbv.push(doc.data())
                })

                setDesbravadores(listDbv)
                setLoadInfoDbv(false)
            })
            .catch((error) => {
                toast.error("Erro ao buscar desbravadores")
                console.log(error)
            })
        }

        loadDbv()
    }, [])

    useEffect(() => {
        let listDiretoria = []

        async function loadDiretoria() {
            await getDocs(collection(db, "diretoria"))
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    listDiretoria.push(doc.data())
                })

                setDiretoria(listDiretoria)
                setLoadInfoDiretoria(false)
            })
            .catch((error) => {
                toast.error("Erro ao buscar diretoria")
                console.log(error)
            })
        }

        loadDiretoria()
    }, [])


    return (
        <div className="h-full flex justify-center items-start">
            <div className='grid grid-cols-2 gap-6 mt-4'>
                <BoxDash title="Desbravadores" quantity={desbravadores.length} loadInfo={loadInfoDbv} />
                <BoxDash title="Diretoria" quantity={diretoria.length} loadInfo={loadInfoDiretoria} />
            </div>
        </div>
    )
}