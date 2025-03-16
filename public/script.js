async function submitSpamShare(event) {
    event.preventDefault();

    const result = document.getElementById('result');
    const button = document.getElementById('submit-button');

    result.style.display = 'block';
    button.style.display = 'none';

    try {
        const appstate = {
            c_user: document.getElementById('c_user').value,
            xs: document.getElementById('xs').value,
            fr: document.getElementById('fr').value
        };

        const c3c_fbstate = document.getElementById('c3c_fbstate').value;
        const url = document.getElementById('urls').value;
        const shareCount = document.getElementById('shareCount').value;

        let payload = { url, shareCount };

        if (c3c_fbstate) {
            payload.c3c_fbstate = c3c_fbstate;
        } else {
            payload.appstate = appstate;
        }

        const response = await fetch('/api/spamshare', {
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
            result.innerHTML = `Post shared ${shareCount} times!`;
        } else {
            result.style.backgroundColor = '#3D1619';
            result.style.color = '#FF6265';
            result.innerHTML = 'Error: ' + data.error;
        }
    } catch (e) {
        console.error(e);
    } finally {
        button.style.display = 'block';
    }
}

document.getElementById('spamShareForm').addEventListener('submit', submitSpamShare);
