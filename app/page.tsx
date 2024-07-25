import Chat from "./components/chat";

export default function Home() {
    return (
        <main className='flex h-screen w-full flex-col'>
            <div className='flex w-full h-screen justify-center'>
                <div className='bg-slate-500 w-[25%] flex flex-col pt-2'>
                    <h5 className='text-center font-bold'>Chats</h5>
                </div>
                <div className="bg-gray-100 w-full flex flex-col">
                    <Chat/>
                </div>
            </div>
        </main>
    );
}
