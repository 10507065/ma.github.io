function calculateCost() {
    // Obtener valores de los inputs
    let currentCost = parseFloat(document.getElementById("currentCost").value) || 0;
    let inflation = parseFloat(document.getElementById("inflation").value) / 100 || 0;
    let materialIncrease = parseFloat(document.getElementById("materialIncrease").value) / 100 || 0;
    let exchangeRate = parseFloat(document.getElementById("exchangeRate").value) / 100 || 0;

    // Validar que el costo actual sea mayor a 0
    if (currentCost <= 0) {
        document.getElementById("result").innerText = "Por favor, ingresa un costo actual válido.";
        return;
    }

    // Calcular el costo con inflación
    let costWithInflation = currentCost * (1 + inflation);

    // Ajustar por aumento de materia prima (suponiendo que afecta el 50% del costo)
    let materialCost = (currentCost * 0.5) * materialIncrease;
    let costWithMaterial = costWithInflation + materialCost;

    // Ajustar por devaluación (suponiendo que afecta el 30% del costo)
    let exchangeCost = (currentCost * 0.3) * exchangeRate;
    let finalCost = costWithMaterial + exchangeCost;

    // Mostrar resultado redondeado a 2 decimales
    document.getElementById("result").innerText = `Costo proyectado: $${finalCost.toFixed(2)}`;
}