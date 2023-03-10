import {Bar} from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import {Chart as Charts, LinearScale, LineElement, Tooltip, Title, Legend,
    CategoryScale, PointElement, BarElement, PieController, ArcElement, Filler} from "chart.js";
Charts.register(
    LinearScale, LineElement, Tooltip, Title, Legend, CategoryScale, LinearScale, PointElement,
    zoomPlugin,BarElement, PieController,ArcElement, Filler
)

//See Line Chart.js documentation for understanding of this chart is working. Buttons are just changing the
export default function LineChart(props) {
    let Data = {

        //All labels needed for proper display of Chart
        labels: Object.keys(props.data),
        datasets: [
            {
            label: props.title,
            data: Object.values(props.data),
            backgroundColor: [
                "rgba(106, 13, 173, 0.8)",
                "rgba(106, 13, 173, 0.6)",
                ],
            borderColor: "rgb(135, 206, 235)",
            borderWidth: 0,
            order: 1
            }
        ]
    }
    return(
         // This is the main div of this component
        <div className={"single_chart"}> {/*This is the main div of this component*/}
            <div className={"Charts_Div"}>
                <Bar

                    // Graph options along with data, to display on graph
                    data={Data}
                    options={{
                        scales:{
                            x:{
                                min:Object.keys(props.data).length-10,
                                max:Object.keys(props.data).length,
                            },

                            y:{
                                max:Math.max(...Object.values(props.data))+2,
                                beginAtZero:true
                            }
                        },
                        barThickness:25,
                        animations: {
                            tension: {
                                duration: 10000,
                                easing: 'linear',
                                from: 1,
                                to: 0,
                                loop: true
                            }
                        },
                        plugins:
                            {
                                zoom: {
                                    pan: {
                                        enabled:true,
                                        mode:'x',
                                    },
                                    zoom: {
                                        wheel: {enabled: true,},
                                        pinch: {enabled: true},
                                        mode: 'x',
                                    }
                                },
                            }
                    }}/>
            </div>
        </div>
    )
}