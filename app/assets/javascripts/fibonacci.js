function getFibonacci(first_value, second_value, array_length) {
    var array = [first_value, second_value];
    while (array.length < array_length) {
        var result = array[array.length - 2] + array[array.length - 1];
        array.push(result);
    }
    return array;
}