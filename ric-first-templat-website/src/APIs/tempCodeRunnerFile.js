
async function displayPublications() {
    try {
        const response = await fetch("http://localhost:8000/api/Publications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                title: "wireless",
            }),
        });

        const data = await response.json();
        console.log(data);
        console.log("hello world");
    } catch (error) {
    }
}
displayPublications();