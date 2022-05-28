/**
 * Actividad 0 por Adrian Abreu para DEW 2DAWNA 2022
 */
employees.forEach(employee => {
    if (employee.control === 1) {
        alert('El empleado: ' + employee.name
            + " del departamento: " + employee.department)
    } else {
        console.warn(`Los datos de ${employee.id} pueden estar corruptos`)
    }
});