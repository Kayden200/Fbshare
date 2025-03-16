document.getElementById('submitForm').addEventListener('submit', submitForm);

async function submitForm(event) {
    event.preventDefault();

    const result = document.getElementById('result');
    const button = document.getElementById('submit-button');

    result.style.display = 'block';
    button.style.display = 'none';

    try {
        // Collect AppState or c3c_fbstate based on user input
        const appstate = {
            c_user: document.getElementById('c_user').value,
            xs: document.getElementById('xs').value,
            fr: document.getElementById('fr').value
        };

        const c3c_fbstate = document.getElementById('c3c_fbstate').value;

        // Construct request payload dynamically
        let payload = {
            url: document.getElementById('urls').value,
            amount: document.getElementById('amounts').value,
            interval: document.getElementById('intervals').value
        };

        // Add either appstate or c3c_fbstate based on availability
        if (c3c_fbstate) {
            payload.c3c_fbstate = c3c_fbstate;
        } else {
            payload.appstate = appstate;
        }

        const response = await fetch('/api/submit', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.status === 200) {
            result.style.backgroundColor = '#32f0dc';
            result.style.color = '#222';
            result.innerHTML = 'Submitted successfully!';
            button.style.display = 'block';
        } else {
            result.style.backgroundColor = '#3D1619';
            result.style.color = '#FF6265';
            result.innerHTML = 'Error: ' + data.error;
            button.style.display = 'block';
        }
    } catch (e) {
        console.error(e);
    }
}
