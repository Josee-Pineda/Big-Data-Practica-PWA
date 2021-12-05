if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js').then(() => {
            console.log('I am the service Worker and im working.');
        })
    })
}