import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
    return (
        <Link href="/">
            <div className="items-center hidden lg:flex">
            <Image src="/logo.svg" height={35} width={35} alt='logo'/>
            <p className="font-semibold text-color_white text-2xl ml-2.5">
                Client Access
            </p>
            </div>
        </Link>
    )
}