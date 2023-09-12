
async function displayPublications() {
    try {
        const response = await fetch("https://apix.collaborate.nust.edu.pk/api/Publications", {
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