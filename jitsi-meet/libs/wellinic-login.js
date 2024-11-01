async function authenticateUser(email, password) {
    // Kimlik doğrulama için API'ye istek gönderiyoruz
    const response = await fetch('https://your-authentication-api.com/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    // API'nin başarılı bir yanıt döndüğünü varsayalım
    if (data.success && data.user_id) {
        return data.user_id;
    } else {
        throw new Error('Authentication failed');
    }
}

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

    // Formdan e-posta ve şifreyi al
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    try {
        const user_id = await authenticateUser(email, password);

        // Eğer kimlik doğrulama başarılıysa, formu gizle ve Jitsi Meet oturumunu başlat
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('react').style.display = 'block';

        console.log('Giriş başarılı! Kullanıcı ID:', user_id);
    } catch (error) {
        console.error('Giriş başarısız:', error.message);
        alert('Giriş başarısız. Lütfen e-posta ve şifrenizi kontrol edin.');
    }
});
