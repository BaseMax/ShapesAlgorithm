// Max Base
// https://github.com/BaseMax/ShapesAlgorithm
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

const cropMatrix = (w, h, width, height) => {
    const arr = [];
    for (let i = 0; i < height; i++) {
        arr.push([]);
        for (let j = 0; j < width; j++) {
            if (MAT[h + i] === undefined || MAT[h + i][w + j] === undefined) return null;
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

    // colorize all possible box smaller than MAX_BOX.W and MAX_BOX.H
    const sizes = [];
    for (let i = MAX_BOX.H; i >= 1; i--) {
        for (let j = MAX_BOX.W; j >= 1; j--) {
            if (i === MAX_BOX.H && j === MAX_BOX.W) continue;

            sizes.push([j, i]);
        }
    }

    const looking_for_size = (size) => {
        // we are looking for rectangles with `size[0]` as width and `size[1]` as height in MAT (matrix) they are UNDEFINED fields
        const res = hasUndefinedRectangle(size[0], size[1]);
        
        if (res !== false) {
            // we found a rectangle with `size[0]` as width and `size[1]` as height in MAT (matrix) they are UNDEFINED fields
            // now we should fill them with a color
            const color = random_color();

            for (let i = 0; i < size[1]; i++) {
                for (let j = 0; j < size[0]; j++) {
                    MAT[res["y"] + i][res["x"] + j] = color;
                }
            }

            return true;
        }

        return false;
    };

    // colorize all possible boxs with `sizes` size
    for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i];

        // looking for possible boxs with `size` size
        // if there are undefiend with `size`, so we can generate a random color and fill that.
        while(looking_for_size(size) === true) {}
    }
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
                console.log("\t\t<td style=\"background-color: " + MAT[i][j] + "\">*</td>");
            }
        }
        console.log("\t</tr>");
    }
    console.log("</table>");
};

// ====================== init
calculate();
print();
