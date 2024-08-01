import app from '../app';

const assert = require('assert');

function parseCoordinates(input) {
    // Удаляем пробелы в начале и конце строки
    input = input.trim();
    // Проверяем, есть ли квадратные скобки
    if (input.startsWith('[') && input.endsWith(']')) {
        // Удаляем квадратные скобки
        input = input.slice(1, -1);
    }

    // Разделяем строку на широту и долготу
    const parts = input.split(',');
    if (parts.length !== 2) {
        throw new Error('Неверный формат координат');
    }

    // Парсим широту и долготу
    const lat = parseFloat(parts[0].trim());
    const long = parseFloat(parts[1].trim());

    // Проверяем, что значения широты и долготы корректны
    if (isNaN(lat) || isNaN(long)) {
        throw new Error('Неверный формат координат');
    }

    return {
        lat: lat,
        long: long
    };
}

describe('parseCoordinates', function() {
    it('should parse coordinates with space', function() {
        const coordinates = parseCoordinates('51.50851, -0.12572');
        assert.deepEqual(coordinates, { lat: 51.50851, long: -0.12572 });
    });

    it('should parse coordinates without space', function() {
        const coordinates = parseCoordinates('51.50851,-0.12572');
        assert.deepEqual(coordinates, { lat: 51.50851, long: -0.12572 });
    });

    it('should parse coordinates in square brackets', function() {
        const coordinates = parseCoordinates('[51.50851, -0.12572]');
        assert.deepEqual(coordinates, { lat: 51.50851, long: -0.12572 });
    });

    it('should throw an error for invalid format', function() {
        assert.throws(() => parseCoordinates('51.50851 -0.12572'), /Неверный формат координат/);
        assert.throws(() => parseCoordinates('51.50851,'), /Неверный формат координат/);
        assert.throws(() => parseCoordinates('51.50851'), /Неверный формат координат/);
    });
});