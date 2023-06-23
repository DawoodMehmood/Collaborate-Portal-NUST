async function fetchPublicationswithid(x) {
    return await fetch(`http://localhost:8000/api/Publications/${x}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}

async function fetchProjectswithid(x) {
    return await fetch(`http://localhost:8000/api/Projects/${x}`)
        .then((response) => response.json()).then(
            (data) => {
                return data;
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


export { fetchPublicationswithid, fetchProjectswithid, fetchIPwithid }
