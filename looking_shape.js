const matrix = [
    [1, 5, null, null],
    [2, 6, null, null],
    [3, 7, null, null],
    [4, 8, null, null],
];

const hasUndefinedRectangle2 = (width, height) => {
    let h = 0;
    let w = 2;

    // for (let h = 0; h < matrix.length; h++) {
    //     for (let w = 0; w < matrix[0].length; w++) {
            // if (matrix[h][w] !== null) continue;
            let hasUndefined = false;

            let count_w = 1;
            let count_h = 1;
            while (count_w <= width) {
                count_h = 1;
                if (matrix[h][w + count_w -1] !== null) continue;
                console.log("w: ", count_w, "<=", width, matrix[h][w + count_w -1]);

                while (count_h <= height) {
                    if (matrix[h + count_h -1][w + count_w -1] !== null) {
                        hasUndefined = false;
                        break;
                    }
                    console.log("h: ", count_h, "<=", height, matrix[h + count_h -1][w + count_w -1]);
                    count_h++;
                }

                if (count_h - 1 !== height) {
                    hasUndefined = false;
                    break;
                }
                count_w++;

                // while (count_h <= height) {
                //     if (h + count_h >= matrix.length || w + count_w >= matrix[0].length) {
                //         hasUndefined = false;
                //         break;
                //     }
                //     if (matrix[h + count_h][w + count_w] !== null) {
                //         hasUndefined = false;
                //         break;
                //     }
                //     count_h++;
                // }
            }

            console.log([count_h - 1, count_w - 1]);
            if (count_h - 1 === height && count_w - 1 === width) {
                return true;
            }

            // console.log([h, w], hasUndefined);
            // if (hasUndefined === true) {
            //     return true;
            // }
    //     }
    // }

    return false;
};

const cropMatrix = (w, h, width, height) => {
    const arr = [];
    for (let i = 0; i < height; i++) {
        arr.push([]);
        for (let j = 0; j < width; j++) {
            if (matrix[h + i][w + j] === undefined) return null;
            arr[i].push(matrix[h + i][w + j]);
        }
    }
    return arr;
};

const hasUndefinedRectangle = (width, height) => {
    for (let h = 0; h < matrix.length; h++) {
        for (let w = 0; w < matrix[0].length; w++) {
            if (matrix[h][w] !== null) continue;

            const arr = cropMatrix(w, h, width, height);
            if (arr === null) {
                continue;
            }

            // if all values in arr is null
            // console.log(arr);
            if (arr.every((row) => row.every((value) => value === null))) {
                return true;
            }
        }
    }

    return false;
};

console.log(matrix);
// console.log( [2, 2], hasUndefinedRectangle(2, 2) ); // xx, xx
// console.log( [2, 4], hasUndefinedRectangle(2, 4) ); // xx, xx, xx, xx
console.log( [2, 4], hasUndefinedRectangle(4, 2) ); // xxxx, xxxx
// console.log( [4, 2], hasUndefinedRectangle(2, 2) ); // xxxx, xxxx
