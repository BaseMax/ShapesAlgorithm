// Max Base
// 2022/09/18

// 9 items 3cm in 3cm (called G1)
// 3 items 1cm in 3cm (called G2)
// 3 items 3cm in 1cm (called G3)
// And a 1cm in 1cm item (called G4)

// const
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

// functions
(() => {
    for (let i = 0; i < MAIN_BOX.H; i++) {
        MAT[i] = [];
        for (let j = 0; j < MAIN_BOX.W; j++) {
            MAT[i][j] = undefined;
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

    // colorize all possible box smaller than MAX_BOX.W and MAX_BOX.H
    const sizes = [];
    for (let i = MAX_BOX.H; i >= 1; i--) {
        for (let j = MAX_BOX.W; j >= 1; j--) {
            if (i === MAX_BOX.H && j === MAX_BOX.W) continue;

            sizes.push([i, j]);
        }
    }

    console.log(sizes);

    const looking_for_size = (size) => {
        // we are looking for rectangles with `size[0]` as width and `size[1]` as height in MAT (matrix) they are UNDEFINED fields
        for (let i = 0; i < MAT.length; i += size[1]) {
            for (let j = 0; j < MAT[i].length; j += size[0]) {
            }
        }
    };

    // colorize all possible boxs with `sizes` size
    for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i];

        // looking for possible boxs with `size` size
        // if there are undefiend with `size`, so we can generate a random color and fill that.
        console.log(size);
        looking_for_size(size);
    }
};

const print = () => {
    // console.log(MAT);

    console.log("<table border=\"2\">");
    for (let i = 0; i < MAT.length; i++) {
        console.log("\t<tr>");
        for (let j = 0; j < MAT[0].length; j++) {
            if (MAT[i][j] === undefined) {
                console.log("\t\t<td>N</td>");
            } else {
                console.log("\t\t<td style=\"background-color: " + MAT[i][j] + "\"></td>");
            }
        }
        console.log("\t</tr>");
    }
    console.log("</table>");
};

// init
calculate();
// print();






function has_undefined_rectangle(width, height)
{
    console.log(MAT);

    for (let i = 0; i < MAT.length; i += height) {
        for (let j = 0; j < MAT[i].length; j += width) {
            if (MAT[i][j] !== undefined) continue;

            let has_undefined = true;
            let count_i = 0;
            let count_j = 0;
            while (count_j < width) {
                count_i = 1;
                console.log(`\nj: ${count_j} <= ${width}`);

                while (count_i <= height) {
                    if (i + count_i >= MAT.length || j + count_j >= MAT[i].length) {
                        console.log("\tbreak");
                        has_undefined = false;
                        break;
                    }

                    console.log(`\ti: ${count_i} <= ${height}`);
                    console.log("\t", i + count_i, j + count_j, MAT[i + count_i][j + count_j]);
                    if (MAT[i + count_i][j + count_j] !== undefined) {
                        console.log("\tbreak");
                        has_undefined = false;
                        break;
                    }
                    count_i++;
                }
                count_j++;
            }

            if (has_undefined === true) {
                console.log("found undefined rectangle");
                return true;
            }
        }
    }

    return false;
}

console.log(has_undefined_rectangle(3, 1));
// console.log(has_undefined_rectangle(1, 3));
