// import { useState } from 'react';
import Button from '../button/Button';
import SelectUser from '../selectUser/SelectUser';
import Logo from '../logo/logo';

const logos = ['/logo.svg', '/vite.svg'];


function Header() {

    // const [logoIndex, setLogoIndex] = useState(0);

    // console.log("Header");

    // const toggleLogo = () => {
    //     setLogoIndex(state => Number(!state));
    // };

    return (
        <>
            <Logo image={logos[0]} />
            <SelectUser />
            {/* <Button onClick={toggleLogo}>Сменить лого</Button> */}
        </>
    )
}

export default Header