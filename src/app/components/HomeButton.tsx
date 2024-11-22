import { Toolbar } from 'primereact/toolbar';
        
export default function HomeButton({text, icon, inverted = false, backgroundImage, link = "#"}: {text: string, icon: string, inverted: boolean, backgroundImage: string, link: string}) {

    const textComponent = <div className={`${!inverted ? 'pl-3' : 'pr-3'} text-white uppercase`}  style={{fontSize: "1.5rem"}}>{text}</div>;
    const iconComponent = <i className={`${icon} ${ !inverted ? 'pr-3' : 'pl-3'}`} style={{ fontSize: '2.25rem', color: "#2A21BC"}}></i>;

    return (
        <a className='lg:col-3 md:col-5 sm:col-5 col-9 p-0' href={link} style={{textDecoration: "none"}}>
            {!inverted ? <Toolbar start={textComponent} end={iconComponent} className="w-full bg-white shadow-3 h-6rem" style={{ borderRadius: '25px', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }} />
            : <Toolbar start={iconComponent} end={textComponent} className="w-full bg-white shadow-3 h-6rem" style={{ borderRadius: '25px', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }} />}
        </a>
    )

}