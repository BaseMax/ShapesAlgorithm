// Max Base
// https://github.com/BaseMax/ShapesAlgorithm
// 2022/09/18

// 9 items 3cm in 3cm (called G1)
// 3 items 1cm in 3cm (called G2)
// 3 items 3cm in 1cm (called G3)
// And a 1cm in 1cm item (called G4)

// ====================== const
const MAT = [];
const COLORS = [];

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
            COLORS[`${MAX_BOX.W}_${MAX_BOX.H}`] = 1;

            for (let k = 0; k < MAX_BOX.H; k++) {
                for (let l = 0; l < MAX_BOX.W; l++) {
                    MAT[i + k][j + l] = {
                        "color": color,
                        "name": 1
                    };
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
            if (!COLORS[`${size[0]}_${size[1]}`]) {
                COLORS[`${size[0]}_${size[1]}`] = Object.keys(COLORS).length + 1;
            }
            const key = COLORS[`${size[0]}_${size[1]}`];

            for (let i = 0; i < size[1]; i++) {
                for (let j = 0; j < size[0]; j++) {
                    MAT[res["y"] + i][res["x"] + j] = {
                        "color": color,
                        "name": key
                    };
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
        console.log("\t<tr align=\"center\">");
        for (let j = 0; j < MAT[0].length; j++) {
            if (MAT[i][j] === null) {
                console.log("\t\t<td>N</td>");
            } else {
                console.log("\t\t<td style=\"background-color: " + MAT[i][j].color + "\">" + MAT[i][j].name + "</td>");
            }
        }
        console.log("\t</tr>");
    }
    console.log("</table>");
};

// ====================== example test
const MAIN_BOX = {
    W: 14,
    H: 8
};
const MAX_BOX = {
    W: 3,
    H: 3
};

calculate();
print();

// ====================== DOM
class ShapeAlgorithm {
    constructor() {
        this.main_box = {
            w: 14,
            h: 8
        };
        this.max_box = {
            w: 3,
            h: 3
        };
        this.mat = [];
        this.colors = [];
        this.sizes = [];

        this.init();
    }

    init() {
        this.initMat();
        this.initSizes();
    }

    initMat() {
        for (let i = 0; i < this.main_box.h; i++) {
            this.mat[i] = [];
            for (let j = 0; j < this.main_box.w; j++) {
                this.mat[i][j] = null;
            }
        }
    }

    initSizes() {
        for (let i = this.max_box.h; i >= 1; i--) {
            for (let j = this.max_box.w; j >= 1; j--) {
                if (i === this.max_box.h && j === this.max_box.w) continue;

                this.sizes.push([j, i]);
            }
        }
    }

    randomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    cropMatrix(w, h, width, height) {
        const arr = [];
        for (let i = 0; i < height; i++) {
            arr.push([]);
            for (let j = 0; j < width; j++) {
                if (this.mat[h + i] === undefined || this.mat[h + i][w + j] === undefined) return null;
                arr[i].push(this.mat[h + i][w + j]);
            }
        }
        return arr;
    }

    hasUndefinedRectangle(width, height) {
        for (let h = 0; h < this.mat.length; h++) {
            for (let w = 0; w < this.mat[0].length; w++) {
                if (this.mat[h][w] !== null) continue;

                const arr = this.cropMatrix(w, h, width, height);
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
    }

    calculate() {
        // colorize the main box
        const color = this.randomColor();
        this.colors[`${this.max_box.w}_${this.max_box.h}`] = 1;

        for (let i = 0; i < this.max_box.h; i++) {
            for (let j = 0; j < this.max_box.w; j++) {
                this.mat[i][j] = {
                    "color": color,
                    "name": 1
                };
            }
        }

        // colorize all possible box smaller than MAX_BOX.W and MAX_BOX.H
        const lookingForSize = (size) => {
            // we are looking for rectangles with `size[0]` as width and `size[1]` as height in MAT (matrix) they are UNDEFINED fields
            const res = this.hasUndefinedRectangle(size[0], size[1]);
            
            if (res !== false) {
                // we found a rectangle with `size[0]` as width and `size[1]` as height in MAT (matrix) they are UNDEFINED fields
                // now we should fill them with a color
                const color = this.randomColor();
                if (!this.colors[`${size[0]}_${size[1]}`]) {
                    this.colors[`${size[0]}_${size[1]}`] = Object.keys(this.colors).length + 1;
                }
                const key = this.colors[`${size[0]}_${size[1]}`];

                for (let i = 0; i < size[1]; i++) {
                    for (let j = 0; j < size[0]; j++) {
                        this.mat[res["y"] + i][res["x"] + j] = {
                            "color": color,
                            "name": key
                        };
                    }
                }

                return true;
            }

            return false;
        };

        // colorize all possible boxs with `sizes` size
        for (let i = 0; i < this.sizes.length; i++) {
            const size = this.sizes[i];

            // looking for possible boxs with `size` size
            // if there are undefiend with `size`, so we can generate a random color and fill that.
            while(lookingForSize(size) === true) {}
        }
    }

    print() {
        let res = "";

        res += "<table border=\"2\">";
        for (let i = 0; i < this.mat.length; i++) {
            res += "\t<tr align=\"center\">";
            for (let j = 0; j < this.mat[0].length; j++) {
                if (this.mat[i][j] === null) {
                    res += "\t\t<td>N</td>";
                } else {
                    res += "\t\t<td style=\"background-color: " + this.mat[i][j].color + "\">" + this.mat[i][j].name + "</td>";
                }
            }
            res += "\t</tr>";
        }
        res += "</table>";

        return res;
    }

    getColors() {
        return this.colors;
    }

    getSizes() {
        return this.sizes;
    }

    getMat() {
        return this.mat;
    }

    getMainBox() {
        return this.main_box;
    }

    getMaxBox() {
        return this.max_box;
    }

    getMatSize() {
        return {
            w: this.mat[0].length,
            h: this.mat.length
        };
    }

    getMatSizeWithMaxBox() {
        return {
            w: this.mat[0].length + this.max_box.w - 1,
            h: this.mat.length + this.max_box.h - 1
        };
    }

    getMatSizeWithMainBox() {
        return {
            w: this.mat[0].length + this.main_box.w - 1,
            h: this.mat.length + this.main_box.h - 1
        };
    }
}
