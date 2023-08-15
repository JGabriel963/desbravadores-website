import { ImSpinner8 } from 'react-icons/im'

export default function BoxDash({ title, quantity, loadInfo }) {
  return (
    <article className={`flex flex-col items-center ${loadInfo ? 'justify-center' : ''} gap-y-1 bg-green-200 p-5 rounded-xl shadow-md`}>
      {loadInfo ? (
        <ImSpinner8 size={90} className='animate-spin'/>
      ) : (
        <>
          <h2 className="text-xl font-medium">{title}</h2>
          <hr className="border-2 border-green-500 w-full" />
          <span className="font-extrabold text-8xl">{quantity}</span>
        </>
      )}
    </article>
  );
}
