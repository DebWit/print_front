
const numberRandom = [627,625,713,612,519,587,663,393,819,496,351,882,454,213,576,565,127,954,987,389,123,764,319,847,473,696,482,619,515,932,998,260,111,496,798,974,191,251,155,264,227,964,126,697,563,573,828,644,882,274,462,269,831,121,439,131,600,813,343,751,676,601,813,496,217,311,438,687,359,461,440,913,301,667,817,912,866,931,933,245,149,773,384,755,204,736,185,543,886,660,825,772,264,493,132,590,717,877,901,357];
export default function EventButton({key = 0, title = "Lorem Ipsum", startTime = "7:40", endTime = "8:40", location = "CEAF", anchor = "#" }) {
    let i = key+2;
    const textColor = [ "#118CCD", "#279F50", "#CD9B11", "#IIBACD", "#CD1114", "#CD11CA"];
    const formatTime = (time: string) =>{
        let [hours, minutes] = time.split(":");
        hours = hours.padStart(2, "0");
        minutes = minutes.padStart(2, "0");
        return `${hours}:${minutes}`;
    }
    const sorter = (a:number) => {
        if(i  > 100)
            i = i % 100
        if( (numberRandom[i%1000] * a) % 6 >= 0 && (numberRandom[i%1000] * a) % 6 <= 3) {
            i = Math.floor(numberRandom[a%100] * 3.67);

            return i%5;
        } else {
            i = Math.floor(numberRandom[a%100] * 5 * 0.5);
            return i%5;
        }
    }
    sorter(i);
    const colorStyle = (color: number) => {
        return {
            backgroundColor: textColor[color]+"4C",
            color: textColor[color],
            borderRadius: "15px",
        }
    }
    const verStyle = {
        backgroundColor: "#118CCD",
        color: "#FFF",
        borderRadius: "5px",
        textDecoration: "none",
    }
    
    return (
        <div className="md:col-3 md:m-0 grid justify-content-center bg-white p-2 m-3 border-round-xl">
            <div className="col-12 px-2 mb-2 text-2xl">
                {title}
            </div>
            <div className="w-full flex gap-2 mx-2 mb-2">
                <div className="flex-none p-2" style={colorStyle(sorter(i))}>
                    {formatTime(startTime)} às {formatTime(endTime)}
                </div>
                <div className="flex-none p-2" style={colorStyle(sorter(i))}>
                    {location}
                </div>
                <div className="flex-grow w-full"></div>
                <a href={anchor} className="flex text-center align-items-center px-3" style={verStyle}>Ver</a>
            </div>
        </div>


    )
}