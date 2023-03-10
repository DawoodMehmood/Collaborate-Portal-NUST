import {Pie} from "react-chartjs-2";
// import zoomPlugin from 'chartjs-plugin-zoom';
import {Chart as Charts, LinearScale, LineElement, Tooltip, Title, Legend,
    CategoryScale, PointElement, BarElement, PieController, ArcElement, Filler} from "chart.js";
Charts.register(
    LinearScale, LineElement, Tooltip, Title, Legend, CategoryScale, LinearScale, PointElement,
    BarElement, PieController,ArcElement, Filler
)

//See Pie Chart.js documentation for understanding of this chart is working. Buttons are just changing the
export default function PieChart(props) {


    // This code takes the keys and values from props.data object and calculates the sum of all values.
    // Then it creates a new array of labels by appending percentage of each value to its corresponding key.

    const PassedLabels = Object.keys(props.data);
    const PassedValues = Object.values(props.data);
    let labels = [];

    // Calculating the sum of all values
    const sum = PassedValues.reduce((initialValue, currentValue) => {
        return initialValue + currentValue;
    }, 0);

    // Creating new labels array by appending percentage of each value to its corresponding key
    for (let i = 0; i < PassedLabels.length; i++) {
        labels.push(
            PassedLabels[i] + " (" + ((PassedValues[i] / sum) * 100).toFixed(2) + "%)"
        );
    }
    let Data = {
        //All labels needed for proper display of Chart
        labels: labels,
        datasets: [
            {
                label: props.title,
                data: Object.values(props.data),
                backgroundColor: [
                    "rgba(106, 13, 173, 1)",
                    "rgba(106, 13, 173, 0.4)",
                    "rgba(106, 13, 173, 0.1)",
                    "rgba(106, 13, 173, 0.7)",
                ],
                order: 1,
            }
        ]
    }
    return(
        <div className={"single_chart"}> {/*This is the main div of this component*/}
            <div className={"Charts_Div"}>
                <Pie
                    className={"chart"}
                    data={Data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            datatables: {
                                display: true,
                                align: 'bottom',
                                backgroundColor: '#ccc',
                                borderRadius: 3,
                                font: {
                                    size: 18,
                                },
                            },
                        },
                        scales:{
                            x:{
                                display:false,
                                grid:{display:false},
                                ticks:{display:false}
                            },
                            y:{
                                display:false,
                                grid:{display:false},
                                ticks:{display:false}
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}