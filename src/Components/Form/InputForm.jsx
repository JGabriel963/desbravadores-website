export default function InputForm({type, id, placehold }) {
    return (
        <input 
            type={type} 
            id={id} 
            placeholder={placehold}
            className="input" 
        />
    )
}