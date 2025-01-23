function findMultiplesAndSum(array) {
    const multiples = array.filter(num => num % 3 === 0 && num % 5 === 0);
    const sum = multiples.reduce((acc, num) => acc + num, 0);
    document.write("Các số là bội chung của 3 và 5:", multiples);
    document.write("Tổng của các số đó:", sum);
}

const inputArray = prompt("Nhập các phần tử của mảng (cách nhau bởi dấu cách):")
    .split(" ")
    .map(Number);

if (inputArray.length > 20) {
    document.write.error("Mảng không được vượt quá 20 phần tử!");
} else {
    findMultiplesAndSum(inputArray);
}
