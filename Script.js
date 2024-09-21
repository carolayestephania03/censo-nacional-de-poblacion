// Función para obtener los datos usando el ID del departamento y el ID del municipio
async function obtenerDatos(deptoId, municipioId) {
    const apiUrl = `https://censopoblacion.azurewebsites.net/API/indicadores/${deptoId}/${municipioId}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.text(); // Obtener el texto de la respuesta
        
        // Primer parseo de JSON
        let jsonData = JSON.parse(data);

        // Segundo parseo de JSON si los datos están anidados como string
        jsonData = JSON.parse(jsonData);

        // Mostrar los datos parseados en la interfaz
        mostrarDatos(jsonData);
    } catch (error) {
        mostrarError('Error al consumir la API o al procesar los datos: ' + error.message);
    }
}

// Función para mostrar los datos en la interfaz
function mostrarDatos(data) {
    const container = document.getElementById('datos-censo');
    container.innerHTML = `
        <h2>Información General</h2>
        <p><strong>Nombre del Municipio:</strong> ${data.nombre}</p>
        <p><strong>Capital:</strong> ${data.capital}</p>
        <p><strong>Extensión Territorial:</strong> ${data.ext_territorial} km²</p>
        <p><strong>Población Total:</strong> ${data.pob_total}</p>

        <h2>Distribución por Sexo</h2>
        <p><strong>Hombres:</strong> ${data.total_sexo_hombre} (${data.porc_sexo_hombre}%)</p>
        <p><strong>Mujeres:</strong> ${data.total_sexo_mujeres} (${data.porc_sexo_mujeres}%)</p>

        <h2>Distribución por Edad</h2>
        <p><strong>Población 0-14 años:</strong> ${data.pob_edad_014} (${data.porc_edad_014}%)</p>
        <p><strong>Población 15-64 años:</strong> ${data.pob_edad_1564} (${data.porc_edad_1564}%)</p>
        <p><strong>Población 65+ años:</strong> ${data.pob_edad_65} (${data.porc_edad_65}%)</p>

        <h2>Distribución por Sectores</h2>
        <p><strong>Urbano:</strong> ${data.total_sector_urbano} (${data.porc_sector_urbano}%)</p>
        <p><strong>Rural:</strong> ${data.total_sector_rural} (${data.porc_sector_rural}%)</p>
    `;
}

// Función para mostrar un mensaje de error
function mostrarError(errorMessage) {
    const container = document.getElementById('datos-censo');
    container.innerHTML = `<p style="color: red;">Error: ${errorMessage}</p>`;
}

// Capturar el envío del formulario
document.getElementById('consulta-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío tradicional del formulario

    // Obtener los valores del formulario
    const deptoId = document.getElementById('depto-id').value;
    const municipioId = document.getElementById('municipio-id').value;

    // Llamar a la función para obtener los datos de la API
    obtenerDatos(deptoId, municipioId);
});
