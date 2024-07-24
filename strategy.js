function sendData(name, email, uniqueId) {
    fetch('https://script.google.com/macros/s/AKfycbxxwf2QLMBxY3rwoYuKHEvwY7j4Qf3uOk2f1H8e2GTyXWZto3AGZRRTIQWtgdaphPP5zg/exec',
        {
            method: 'POST',
            body: JSON.stringify({ name, email, uniqueId }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data sent successfully:', data);
        }) //success message/error message
        .catch(error)
    {
        console.error('Error processing data:', error);
        res.status(500).send('Internal Server Error');
    }
}
function generateUniqueId() {
    if (window.crypto && window.crypto.randomUUID) {
        return window.crypto.randomUUID();
    }

    else {
        return generateFallbackUniqueId();//spport old browsers
    }
}

function generateFallbackUniqueId() {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).substring(2, 15);
}

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('myForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const uniqueId = generateUniqueId();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        document.getElementById('uniqueId').value = uniqueId;
        sendData(name, email, uniqueId);
    });

});