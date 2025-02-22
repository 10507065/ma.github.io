// Array para almacenar los cálculos (se carga desde localStorage si existe)
let calculations = JSON.parse(localStorage.getItem('calculations')) || [];

function calculateCost() {
    // Obtener valores de los inputs
    let productName = document.getElementById("productName").value.trim() || "Producto sin nombre";
    let currentCost = parseFloat(document.getElementById("currentCost").value) || 0;
    let inflation = parseFloat(document.getElementById("inflation").value) / 100 || 0;
    let materialIncrease = parseFloat(document.getElementById("materialIncrease").value) / 100 || 0;
    let exchangeRate = parseFloat(document.getElementById("exchangeRate").value) / 100 || 0;

    // Validar entradas
    if (currentCost <= 0 || inflation < 0) {
        document.getElementById("result").innerText = "Por favor, ingresa un costo actual y una inflación válidos.";
        return;
    }

    // Calcular el costo con inflación
    let costWithInflation = currentCost * (1 + inflation);

    // Ajustar por aumento de materia prima (50% del costo)
    let materialCost = (currentCost * 0.5) * materialIncrease;
    let costWithMaterial = costWithInflation + materialCost;

    // Ajustar por devaluación (30% del costo)
    let exchangeCost = (currentCost * 0.3) * exchangeRate;
    let finalCost = costWithMaterial + exchangeCost;

    // Obtener fecha y hora actuales
    let now = new Date();
    let date = now.toLocaleDateString('es-ES');
    let time = now.toLocaleTimeString('es-ES');

    // Crear objeto con los datos
    let result = {
        producto: productName,
        costo: currentCost,
        inflacion: inflation * 100, // Guardar como porcentaje
        total: finalCost,
        fecha: date,
        hora: time
    };

    // Agregar al array de cálculos
    calculations.push(result);
    localStorage.setItem('calculations', JSON.stringify(calculations));

    // Mostrar resultado
    document.getElementById("result").innerText = `Costo proyectado para ${productName}: $${finalCost.toFixed(2)}`;
}

function downloadJSON() {
    if (calculations.length === 0) {
        alert("No hay cálculos para descargar. Realiza un cálculo primero.");
        return;
    }

    // Crear el contenido JSON
    let jsonContent = JSON.stringify(calculations, null, 2);
    
    // Crear un Blob con el JSON
    let blob = new Blob([jsonContent], { type: "application/json" });
    let url = URL.createObjectURL(blob);

    // Crear un enlace temporal para descargar
    let a = document.createElement("a");
    a.href = url;
    a.download = `calculos_${new Date().toISOString().slice(0,10)}.json`; // Nombre del archivo con fecha
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}