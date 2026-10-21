document.addEventListener('DOMContentLoaded', () => {
    cargarAutomoviles();
    cargarMotocicletas();
});

// Función para consultar al servidor de la IP 54.196.138.190 (Puerto 5000) a través de Vercel
async function cargarAutomoviles() {
    const tbody = document.getElementById('tabla-automoviles');
    tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Cargando automóviles...</td></tr>';
    
    try {
        // Hacemos la petición a la ruta relativa (Vercel la redirige por nosotros)
        const respuesta = await fetch('/api/automoviles');
        
        if (!respuesta.ok) throw new Error('Error en el servidor de automóviles');
        const automoviles = await respuesta.json();
        
        tbody.innerHTML = '';
        if (automoviles.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center">No hay automóviles registrados</td></tr>';
            return;
        }

        automoviles.forEach(auto => {
            tbody.innerHTML += `
                <tr>
                    <td>${auto.id}</td>
                    <td class="fw-bold">${auto.marca}</td>
                    <td>${auto.modelo}</td>
                    <td><span class="badge bg-secondary">${auto.anio}</span></td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error:', error);
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Error al conectar con la API de automóviles</td></tr>';
    }
}

// Función para consultar al servidor de la IP 54.211.157.168 (Puerto 8000) a través de Vercel
async function cargarMotocicletas() {
    const tbody = document.getElementById('tabla-motocicletas');
    tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Cargando motocicletas...</td></tr>';
    
    try {
        // Hacemos la petición a la ruta relativa
        const respuesta = await fetch('/api/motocicletas');
        
        if (!respuesta.ok) throw new Error('Error en el servidor de motocicletas');
        const motocicletas = await respuesta.json();
        
        tbody.innerHTML = '';
        if (motocicletas.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center">No hay motocicletas registradas</td></tr>';
            return;
        }

        motocicletas.forEach(moto => {
            tbody.innerHTML += `
                <tr>
                    <td>${moto.id}</td>
                    <td class="fw-bold">${moto.marca}</td>
                    <td>${moto.modelo}</td>
                    <td><span class="badge bg-secondary">${moto.anio}</span></td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error:', error);
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Error al conectar con la API de motocicletas</td></tr>';
    }
}