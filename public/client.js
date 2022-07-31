function click(){
    fetch("/sendotp", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            email: "bediharsiddak@gmail.com"
        })
    })
    .then((response) => {
        if(response.ok) {
            return response.json();
        }
    })
    .then((data) => {
        console.log(data);
        return data;
    })
}

