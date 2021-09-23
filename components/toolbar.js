import { useRouter } from 'next/router';


export const Toolbar = () => {
    const router = useRouter();

    return (
        <div>

            <div onClick={() => router.push('/')}>Home</div>
            <div onClick={() => window.location.href = 'https://rishwanth.com'}>giTHUB</div>
            <div onClick={() => window.location.href = 'https://rishwanth.com'}>yOUTUBEe</div>

        </div>
    )


}