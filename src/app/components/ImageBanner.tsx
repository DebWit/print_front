export default function ImageBanner(path: string, alt: string) {
    return (
        <>
            <div className="w-full align-content-center justify-content-center ">
                <img src={path} alt={alt} className="" style={{aspectRatio:21/9}} />
            </div>
        </>
    )
}