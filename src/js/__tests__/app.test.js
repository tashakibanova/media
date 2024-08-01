function runTests() {
    const testCases = [
        '51.50851, -0.12572',
        '51.50851,-0.12572',
        '[51.50851, -0.12572]',
        '51.50851,-0.12572',
        'Некорректный формат',
    ];
    testCases.forEach((test) => {
        try {
            const result = validateCoordinates(test);
            console.log(`Тест '${test}' прошел:`, result);
        } catch (error) {
            console.log(`Тест '${test}' не прошел: ${error.message}`);
        }
    });
}