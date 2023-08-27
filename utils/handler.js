const intervalDuration = 1000;
let isInProgress = false;

function fetchData() {
    setInterval(async () => {
        if (!isInProgress) {
            // Wait untill the proccess is finished
            try {
                isInProgress = true;
                const response = await fetch('http://192.168.0.104:3000/encrypt', {
                    method: 'POST',
                    body: "Hello World!"
                });
                const responseData = await response.json();
                console.log('Response:', responseData.encryptedMessage);
            } catch (error) {
                console.error(error.message);
            } finally {
                isInProgress = false;
            }
        } else {
            console.log('Jarayonda');
        }
    }, intervalDuration);
}

fetchData();
