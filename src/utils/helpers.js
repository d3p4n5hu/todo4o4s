export function joinAlternatively(arr1, arr2) {
    let result = [];
    for (let i = 0; i < arr1.length - 1; i++) {
        result = [...result, arr1[i], arr2[i]];
    }
    result.push(arr1[arr1.length - 1]);
    return result;
}

export function extractHashTags(str) {
    return str.match(/#\w+/g) || [];
}
