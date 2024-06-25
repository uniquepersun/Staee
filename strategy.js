function sendData(name, email, uniqueId) {
    fetch('/AKfycbzKOg3ltVpNs30aPfYTkJBXYKBp_eh7WAv311OFgYjw', {
        method: 'POST',
        body: JSON.stringify({ name, email, uniqueId }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Data sent successfully:', data);
        })//success message/error message
        .catch(error => console.error('Error sending data:', error));
}
function generateUniqueId() {
    if (window.crypto && window.crypto.randomUUID) {
        return window.crypto.randomUUID();}

    else {
            return generateFallbackUniqueId();//for older browsers
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