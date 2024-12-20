document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar la galería y extraer los datos
    const galeria = document.querySelector('.galeria');
    const items = galeria.querySelectorAll('.item');

    // Crear un arreglo para almacenar los datos
    const galeriaData = Array.from(items).map(item => {
        const link = item.querySelector('a').href;
        const img = item.querySelector('img');
        return {
            enlace: link,
            imagen: img.src,
            descripcion: img.alt
        };
    });

    // Botón para descargar el JSON
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Descargar galería';
    downloadButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 15px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    document.body.appendChild(downloadButton);

    downloadButton.addEventListener('click', () => {
        // Convertir los datos a JSON
        const jsonData = JSON.stringify(galeriaData, null, 2);

        // Crear un blob con los datos JSON
        const blob = new Blob([jsonData], { type: 'application/json' });//para descargar json

        // Crear un enlace de descarga
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);//
        a.download = 'galeria.json';//se indica nombre del archivo que se descarga
        a.click();

        // Liberar el objeto URL
        URL.revokeObjectURL(a.href);//Es una forma de liberar memoria
    });

    console.log('Datos de la galería:', galeriaData); // Para verificar en la consola
});
