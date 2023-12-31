async function fetchPublicationswithid(x) {
    return await fetch(`http://localhost:8000/api/Publications/${x}`)
        .then((response) => response.json())
        .then((data) => {

            return data;
        });
}
async function fetchConferenceswithid(x) {
    return await fetch(`http://localhost:8000/api/Conferences/${x}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}

async function fetchProjectswithid(x) {
    return await fetch(`http://localhost:8000/api/Projects/${x}`)
        .then((response) => response.json()).then(
            (data) => {
                const temp = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i]["project_status"].includes("Submitted") || data[i]["project_type"].includes("Defense") || data[i]["project_status"].includes("Cancelled/Rejected")) {
                        continue;
                    }
                    temp.push(data[i]);
                }
                return temp;
            }
        );
}

async function fetchIPwithid(x) {
    return await fetch(`http://localhost:8000/api/IP/${x}`)
        .then((response) => response.json()).then(
            (data) => {
                return data;
            }
        );
}
async function fetchFacultywithid(x) {
    return await fetch(`http://localhost:8000/api/Profile/${x}`)
        .then((response) => response.json()).then(
            (data) => {
                // console.log("data",data);
                return data;
            });
}


export { fetchPublicationswithid, fetchProjectswithid, fetchIPwithid, fetchConferenceswithid,fetchFacultywithid }
