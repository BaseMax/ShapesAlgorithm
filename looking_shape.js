const matrix = [
    [1, 5, null, null],
    [2, 6, null, null],
    [3, 7, null, null],
    [4, 8, null, null],
];

const hasUndefinedRectangle = (width, height) => {
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

console.log(matrix);
// console.log( [2, 2], hasUndefinedRectangle(2, 2) );
// console.log( [2, 4], hasUndefinedRectangle(2, 4) );
console.log( [4, 2], hasUndefinedRectangle(4, 2) );
