// Max Base
// 2022/09/18

// 9 items 3cm in 3cm (called G1)
// 3 items 1cm in 3cm (called G2)
// 3 items 3cm in 1cm (called G3)
// And a 1cm in 1cm item (called G4)

// ====================== const
const MAT = [];
const MAIN_BOX = {
    W: 10,
    H: 10
};
const MAX_BOX = {
    W: 3,
    H: 3
};

// const number_max_box = Math.floor(MAIN_BOX.W / MAX_BOX.W) * Math.floor(MAIN_BOX.H / MAX_BOX.H);
// const left_w = MAIN_BOX.W - number_max_box * MAX_BOX.W;
// const left_h = MAIN_BOX.H - number_max_box * MAX_BOX.H;

// console.log(number_max_box);
// console.log(left_w);
// console.log(left_h);

// ====================== functions
(() => {
    for (let i = 0; i < MAIN_BOX.H; i++) {
        MAT[i] = [];
        for (let j = 0; j < MAIN_BOX.W; j++) {
            MAT[i][j] = null;
        }
    }
})();

const random_color = () => {
    // random hex color
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const calculate = () => {
    // colorize all possible MAX_BOX.W * MAX_BOX.H items iterate
    for (let i = 0; i < MAT.length; i += MAX_BOX.H) {
        for (let j = 0; j < MAT[i].length; j += MAX_BOX.W) {
            if (j >= MAIN_BOX.W || i >= MAIN_BOX.H || j+MAX_BOX.W >= MAIN_BOX.W || i+MAX_BOX.H >= MAIN_BOX.H) break;

            const color = random_color();

            for (let k = 0; k < MAX_BOX.H; k++) {
                for (let l = 0; l < MAX_BOX.W; l++) {
                    // console.log(i + k, j + l);
                    MAT[i + k][j + l] = color;
                }
            }
        }
    }

    console.log(MAT);

    // colorize all possible box smaller than MAX_BOX.W and MAX_BOX.H
    const sizes = [];
    for (let i = MAX_BOX.H; i >= 1; i--) {
        for (let j = MAX_BOX.W; j >= 1; j--) {
            if (i === MAX_BOX.H && j === MAX_BOX.W) continue;

            sizes.push([j, i]);
        }
    }

    console.log(sizes);

    const looking_for_size = (size) => {
        // we are looking for rectangles with `size[0]` as width and `size[1]` as height in MAT (matrix) they are UNDEFINED fields
        console.log("Looking for:", size);
        const res = hasUndefinedRectangle(size[0], size[1]);
        console.log(res);
        if (res !== false) {
            // we found a rectangle with `size[0]` as width and `size[1]` as height in MAT (matrix) they are UNDEFINED fields
            // now we should fill them with a color
            const color = random_color();
            for (let i = 0; i < size[1]; i++) {
                for (let j = 0; j < size[0]; j++) {
                    MAT[res[0] + i][res[1] + j] = color;
                }
            }
            return true;
        }

        return false;
    };

    // colorize all possible boxs with `sizes` size
    // for (let i = 0; i < sizes.length; i++) {
    //     const size = sizes[i];

    //     // looking for possible boxs with `size` size
    //     // if there are undefiend with `size`, so we can generate a random color and fill that.
    //     looking_for_size(size);
    // }
};

const print = () => {
    // console.log(MAT);

    console.log("<table border=\"2\">");
    for (let i = 0; i < MAT.length; i++) {
        console.log("\t<tr>");
        for (let j = 0; j < MAT[0].length; j++) {
            if (MAT[i][j] === null) {
                console.log("\t\t<td>N</td>");
            } else {
                console.log("\t\t<td style=\"background-color: " + MAT[i][j] + "\"></td>");
            }
        }
        console.log("\t</tr>");
    }
    console.log("</table>");
};

const cropMatrix = (w, h, width, height) => {
    const arr = [];
    for (let i = 0; i < height; i++) {
        arr.push([]);
        for (let j = 0; j < width; j++) {
            if (MAT[h + i][w + j] === undefined) return null;
            arr[i].push(MAT[h + i][w + j]);
        }
    }
    return arr;
};

const hasUndefinedRectangle = (width, height) => {
    for (let h = 0; h < MAT.length; h++) {
        for (let w = 0; w < MAT[0].length; w++) {
            if (MAT[h][w] !== null) continue;

            const arr = cropMatrix(w, h, width, height);
            if (arr === null) continue;
            // console.log(arr);

            // if all values in arr is null
            if (arr.every((row) => row.every((value) => value === null))) {
                return {
                    x: w,
                    y: h,
                    sx: width,
                    xy: height
                };
            }
        }
    }

    return false;
};

// ====================== init
calculate();

// console.log(has_null_rectangle(3, 1));
// console.log(has_null_rectangle(1, 3));

// console.log( [2, 2], hasUndefinedRectangle(2, 2) ); // xx, xx
// console.log( [2, 4], hasUndefinedRectangle(2, 4) ); // xx, xx, xx, xx
// console.log( [2, 4], hasUndefinedRectangle(4, 2) ); // xxxx, xxxx
// console.log( [4, 2], hasUndefinedRectangle(2, 2) ); // xxxx, xxxx

console.log( [1, 3], hasUndefinedRectangle(1, 3) ); // xxx
console.log( [3, 1], hasUndefinedRectangle(3, 1) ); // x, x, x

// print();
