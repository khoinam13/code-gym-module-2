function countDivisiblePairs(arr, k) {
    let count = 0;
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if ((arr[i] + arr[j]) % k === 0) {
                count++;
            }
        }
    }

    return count;
}

// const arr = [1, 2, 3, 4, 5, 6];
const inputArray = prompt("Nhập các phần tử của mảng (cách nhau bởi dấu cách):")
    .split(" ")
    .map(Number);

if (inputArray.length > 50) {
    document.write.error("Mảng không được vượt quá 50 phần tử");
} else {
    document.write( "Số cặp thỏa mãn là:" ,countDivisiblePairs(inputArray, 5));
}


